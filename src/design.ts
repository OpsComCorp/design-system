import { parse } from "yaml";

export interface Typography {
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  lineHeight?: number | string;
  letterSpacing?: string;
}

export type ComponentProps = Partial<
  Record<"backgroundColor" | "textColor" | "typography" | "rounded" | "padding" | "size" | "height" | "width", string>
>;

export interface DesignSystem {
  name: string;
  description: string;
  colors: Record<string, string>;
  typography: Record<string, Typography>;
  rounded: Record<string, string>;
  spacing: Record<string, string>;
  components: Record<string, ComponentProps>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringMap(value: unknown, key: string): Record<string, string> {
  if (!isRecord(value)) throw new Error(`DESIGN.md: "${key}" must be a map`);
  return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, String(v)]));
}

function mapOf<T>(value: unknown, key: string): Record<string, T> {
  if (!isRecord(value)) throw new Error(`DESIGN.md: "${key}" must be a map`);
  for (const [k, v] of Object.entries(value)) {
    if (!isRecord(v)) throw new Error(`DESIGN.md: "${key}.${k}" must be a map`);
  }
  return value as Record<string, T>;
}

/** Parses the YAML front matter of a DESIGN.md file. The linter has already validated the schema. */
export function parseDesign(source: string): DesignSystem {
  const match = /^---\n([\s\S]*?)\n---/.exec(source);
  if (!match?.[1]) throw new Error("DESIGN.md: no front matter found");
  const data: unknown = parse(match[1]);
  if (!isRecord(data)) throw new Error("DESIGN.md: front matter is not a map");
  return {
    name: String(data.name ?? ""),
    description: String(data.description ?? ""),
    colors: stringMap(data.colors, "colors"),
    typography: mapOf<Typography>(data.typography, "typography"),
    rounded: stringMap(data.rounded, "rounded"),
    spacing: stringMap(data.spacing, "spacing"),
    components: mapOf<ComponentProps>(data.components, "components"),
  };
}

/** Resolves a `{group.token}` reference to its value; returns plain values unchanged. */
export function resolve(design: DesignSystem, value: string): string | Typography {
  const ref = /^\{(\w+)\.([\w-]+)\}$/.exec(value);
  if (!ref) return value;
  const [, group, token] = ref;
  const table = design[group as keyof DesignSystem];
  const resolved = isRecord(table) && token ? table[token] : undefined;
  if (resolved === undefined) throw new Error(`DESIGN.md: broken reference ${value}`);
  return resolved as string | Typography;
}

function luminance(hex: string): number {
  const channels = [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r = 0, g = 0, b = 0] = channels.map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio of two opaque hex colors (alpha digits are ignored). */
export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}
