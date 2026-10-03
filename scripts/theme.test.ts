import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { before, describe, test } from "node:test";
import { fileURLToPath } from "node:url";
import { compile } from "tailwindcss";
import { parseDesign } from "../src/design.ts";
import { buildTheme, colorTable } from "./build-theme.ts";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const design = parseDesign(readFileSync(resolve(ROOT, "DESIGN.md"), "utf8"));
const themeFile = readFileSync(resolve(ROOT, "tokens/theme.css"), "utf8");

// The globals.css shape `shadcn init` writes, with our file in place of its generated blocks.
const APP_CSS = `
@import "tailwindcss";
@import "./tokens/theme.css";
@custom-variant dark (&:is(.dark *));
`;

async function loadStylesheet(id: string, base: string) {
  const path = id === "tailwindcss" ? resolve(ROOT, "node_modules/tailwindcss/index.css") : resolve(base, id);
  return { path, base: dirname(path), content: readFileSync(path, "utf8") };
}

let build: (candidates: string[]) => string;

before(async () => {
  ({ build } = await compile(APP_CSS, { base: ROOT, loadStylesheet }));
});

/** The declarations of the rule for one class, e.g. `.bg-primary { … }`. */
function rule(candidate: string): string {
  const css = build([candidate]);
  const selector = `.${candidate.replace(/[:/]/g, (c) => `\\${c}`)}`;
  const start = css.indexOf(selector);
  assert.ok(start >= 0, `Tailwind generated no CSS for "${candidate}"`);
  return css.slice(start, css.indexOf("}", start) + 1);
}

describe("tokens/theme.css", () => {
  test("is up to date with DESIGN.md", () => {
    assert.equal(themeFile, buildTheme(design), "run `pnpm tokens`");
  });

  test("defines every shadcn color in :root and .dark", () => {
    const css = build([]);
    for (const { name, light, dark } of colorTable(design)) {
      assert.match(css, new RegExp(`--${name}: ${light};`), `:root --${name}`);
      if (dark && dark !== light) assert.match(css, new RegExp(`--${name}: ${dark};`), `.dark --${name}`);
    }
  });
});

describe("shadcn class names", () => {
  for (const { name } of colorTable(design)) {
    test(`bg-${name} / text-${name} / border-${name}`, () => {
      for (const prefix of ["bg", "text", "border"]) {
        assert.match(rule(`${prefix}-${name}`), new RegExp(`var\\(--${name}\\)`));
      }
    });
  }

  test("the base layer shadcn writes (border-border, outline-ring/50) resolves", () => {
    assert.match(rule("border-border"), /var\(--border\)/);
    assert.match(rule("outline-ring/50"), /var\(--ring\)/);
  });

  test("primary is Ink, not the brand blue", () => {
    assert.equal(design.colors.primary, design.colors.foreground);
    assert.notEqual(design.colors.primary, design.colors.brand);
  });

  test("dark: variant targets .dark", () => {
    assert.match(build(["dark:bg-background"]), /:is\(\.dark \*\)/);
  });

  test("rounded-* uses the DESIGN.md scale", () => {
    for (const [name, value] of Object.entries(design.rounded)) {
      assert.match(rule(`rounded-${name}`), new RegExp(`var\\(--radius-${name}\\)`));
      assert.match(build([`rounded-${name}`]), new RegExp(`--radius-${name}: ${value};`));
    }
  });

  test("font-sans and font-heading are the DESIGN.md faces", () => {
    const css = build(["font-sans", "font-heading"]);
    assert.match(css, /--font-sans: var\(--font-instrument-sans, "Instrument Sans"\)/);
    assert.match(css, /--font-heading: var\(--font-archivo, "Archivo"\)/);
  });

  for (const [name, type] of Object.entries(design.typography)) {
    test(`text-${name} carries size, line height, tracking and weight`, () => {
      const css = rule(`text-${name}`);
      assert.match(css, new RegExp(`font-size: var\\(--text-${name}\\)`));
      assert.match(css, new RegExp(`line-height: var\\(--tw-leading, var\\(--text-${name}--line-height\\)\\)`));
      assert.match(css, new RegExp(`font-weight: var\\(--tw-font-weight, var\\(--text-${name}--font-weight\\)\\)`));
      if (type.letterSpacing) {
        assert.match(css, new RegExp(`letter-spacing: var\\(--tw-tracking, var\\(--text-${name}--letter-spacing\\)\\)`));
      }
    });
  }

  test("md: / lg: / 2xl: use the DESIGN.md breakpoints", () => {
    for (const [key, value] of Object.entries(design.spacing).filter(([k]) => k.startsWith("breakpoint-"))) {
      const variant = key.slice("breakpoint-".length);
      assert.match(build([`${variant}:flex`]), new RegExp(`@media \\(width >= ${value}\\)`), variant);
    }
  });

  test("spacing tokens become utilities", () => {
    assert.match(rule("px-gutter-lg"), /var\(--spacing-gutter-lg\)/);
    assert.match(rule("max-w-content-max"), /var\(--spacing-content-max\)/);
    assert.match(rule("min-h-touch-target"), /var\(--spacing-touch-target\)/);
  });
});
