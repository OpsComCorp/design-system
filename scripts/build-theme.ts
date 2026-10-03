import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { type DesignSystem, parseDesign } from "../src/design.ts";

/** Every color variable shadcn/ui reads, in the order its theming docs list them. Charts are not defined yet. */
export const SHADCN_COLORS = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "border",
  "input",
  "ring",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
] as const;

/** shadcn variables that repeat a DESIGN.md color instead of having a token of their own. */
export const ALIASES: Readonly<Record<string, string>> = {
  card: "background",
  "card-foreground": "foreground",
  popover: "background",
  "popover-foreground": "foreground",
  secondary: "accent",
  "secondary-foreground": "foreground",
  "accent-foreground": "foreground",
  input: "border",
  ring: "brand",
  sidebar: "background",
  "sidebar-foreground": "foreground",
  "sidebar-primary": "primary",
  "sidebar-primary-foreground": "primary-foreground",
  "sidebar-accent": "accent",
  "sidebar-accent-foreground": "foreground",
  "sidebar-border": "border",
  "sidebar-ring": "brand",
  "brand-foreground": "primary-foreground",
};

const DARK = "-dark";

function slug(family: string): string {
  return family.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

/** A next/font-friendly stack: an app may set `--font-<family>` to its hashed face; the bare name is the fallback. */
function fontStack(family: string): string {
  return `var(--font-${slug(family)}, "${family}"), ui-sans-serif, system-ui, sans-serif`;
}

/** The light and dark value of every emitted color variable, resolving aliases. */
export function colorTable(design: DesignSystem): Array<{ name: string; light: string; dark?: string }> {
  const { colors } = design;
  for (const name of Object.keys(colors)) {
    if (name.endsWith(DARK) && !(name.slice(0, -DARK.length) in colors)) {
      throw new Error(`DESIGN.md: ${name} has no light token ${name.slice(0, -DARK.length)}`);
    }
  }
  const shadcn = new Set<string>(SHADCN_COLORS);
  // DESIGN.md colors shadcn doesn't know (brand, glass), then aliases that only exist here (brand-foreground).
  const extras = Object.keys(colors).filter((name) => !name.endsWith(DARK) && !shadcn.has(name));
  const aliasOnly = Object.keys(ALIASES).filter((name) => !shadcn.has(name) && !(name in colors));
  return [...SHADCN_COLORS, ...extras, ...aliasOnly].map((name) => {
    const source = name in colors ? name : ALIASES[name];
    const light = source ? colors[source] : undefined;
    if (!source || !light) throw new Error(`DESIGN.md: no color or alias for shadcn variable "${name}"`);
    const dark = colors[`${name}${DARK}`] ?? colors[`${source}${DARK}`];
    return dark ? { name, light, dark } : { name, light };
  });
}

function block(selector: string, lines: readonly string[]): string {
  return `${selector} {\n${lines.map((line) => `  ${line}`).join("\n")}\n}\n`;
}

export function buildTheme(design: DesignSystem): string {
  const table = colorTable(design);
  const body = design.typography["body-md"];
  const heading = design.typography["headline-xl"];
  const radiusBase = design.rounded.lg;
  if (!body || !heading || !radiusBase) throw new Error("DESIGN.md: needs typography.body-md, typography.headline-xl and rounded.lg");

  const root = ["color-scheme: light;", `--radius: ${radiusBase};`, ...table.map((c) => `--${c.name}: ${c.light};`)];
  const dark = [
    "color-scheme: dark;",
    ...table.flatMap((c) => (c.dark && c.dark !== c.light ? [`--${c.name}: ${c.dark};`] : [])),
  ];
  const inline = table.map((c) => `--color-${c.name}: var(--${c.name});`);

  const theme = [
    `--font-sans: ${fontStack(body.fontFamily)};`,
    `--font-heading: ${fontStack(heading.fontFamily)};`,
    ...Object.entries(design.typography).flatMap(([name, t]) => [
      `--text-${name}: ${t.fontSize};`,
      ...(t.lineHeight === undefined ? [] : [`--text-${name}--line-height: ${t.lineHeight};`]),
      ...(t.letterSpacing === undefined ? [] : [`--text-${name}--letter-spacing: ${t.letterSpacing};`]),
      `--text-${name}--font-weight: ${t.fontWeight};`,
    ]),
    ...Object.entries(design.rounded).map(([name, value]) => `--radius-${name}: ${value};`),
    ...Object.entries(design.spacing).map(([name, value]) =>
      name.startsWith("breakpoint-") ? `--${name}: ${value};` : `--spacing-${name}: ${value};`,
    ),
  ];

  return [
    "/*\n * GENERATED from DESIGN.md by scripts/build-theme.ts. Do not edit; run `pnpm tokens`.\n *\n * shadcn/ui + Tailwind v4. Import after `@import \"tailwindcss\";` and declare\n * `@custom-variant dark (&:is(.dark *));` in the app.\n */\n",
    block(":root", root),
    block(".dark", dark),
    block("@theme inline", inline),
    block("@theme", theme),
  ].join("\n");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = new URL("..", import.meta.url);
  const design = parseDesign(readFileSync(new URL("DESIGN.md", root), "utf8"));
  writeFileSync(new URL("tokens/theme.css", root), buildTheme(design));
}
