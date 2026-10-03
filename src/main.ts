import source from "../DESIGN.md?raw";
import { type ComponentProps, contrast, type DesignSystem, parseDesign, resolve, type Typography } from "./design";
import "./style.css";

const PREVIEW_MAX_HEIGHT = 200;

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className: string,
  children: ReadonlyArray<Node | string> = [],
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  node.append(...children);
  return node;
}

function section(title: string, note: string, body: HTMLElement): HTMLElement {
  return el("section", "block", [
    el("div", "block-head", [el("p", "label", [title]), el("p", "note", [note])]),
    body,
  ]);
}

function fontStack(family: string): string {
  return `"${family}", ${family === "Archivo" ? "Arial" : "system-ui"}, sans-serif`;
}

function applyTypography(node: HTMLElement, type: Typography): void {
  node.style.fontFamily = fontStack(type.fontFamily);
  node.style.fontSize = type.fontSize;
  node.style.fontWeight = String(type.fontWeight);
  node.style.lineHeight = String(type.lineHeight ?? "normal");
  node.style.letterSpacing = type.letterSpacing ?? "normal";
}

function ratio(fg: string, bg: string): string {
  const value = contrast(fg, bg);
  return `${value.toFixed(2)}:1${value < 4.5 ? " (below AA)" : ""}`;
}

function colors(design: DesignSystem): HTMLElement {
  const surface = design.colors.background ?? "#ffffff";
  const grid = el(
    "div",
    "swatches",
    Object.entries(design.colors).map(([name, hex]) => {
      const chip = el("div", "chip");
      chip.style.background = hex;
      return el("figure", "swatch", [
        chip,
        el("figcaption", "", [el("strong", "", [name]), el("span", "", [`${hex} · ${contrast(hex, surface).toFixed(2)}:1 on background`])]),
      ]);
    }),
  );
  return section("Colors", "Contrast against background, for reference; AA is judged on component pairs below. Alpha is ignored.", grid);
}

function typography(design: DesignSystem): HTMLElement {
  const rows = Object.entries(design.typography).map(([name, type]) => {
    const sample = el("p", "type-sample", [name.startsWith("label") ? "THE EXPERIENCE / TODAY" : "Bring the world to your training."]);
    applyTypography(sample, type);
    const meta = [type.fontFamily, type.fontSize, String(type.fontWeight), `lh ${type.lineHeight ?? "normal"}`, type.letterSpacing]
      .filter(Boolean)
      .join(" · ");
    return el("div", "type-row", [el("div", "type-meta", [el("strong", "", [name]), el("span", "", [meta])]), sample]);
  });
  return section("Typography", "Headline tokens are desktop maximums; DESIGN.md gives the clamp() rules.", el("div", "", rows));
}

function rounded(design: DesignSystem): HTMLElement {
  const items = Object.entries(design.rounded).map(([name, value]) => {
    const box = el("div", "radius-box");
    box.style.borderRadius = value;
    return el("figure", "radius", [box, el("figcaption", "", [el("strong", "", [name]), el("span", "", [value])])]);
  });
  return section("Shapes", "Large media is rounded; text columns are not boxed.", el("div", "radii", items));
}

function spacing(design: DesignSystem): HTMLElement {
  const rows = Object.entries(design.spacing).map(([name, value]) => {
    const bar = el("div", "bar");
    bar.style.width = value;
    return el("div", "space-row", [el("strong", "", [name]), el("span", "", [value]), el("div", "bar-track", [bar])]);
  });
  return section("Layout", "Spacing, widths and breakpoints, at true size (clipped to the frame).", el("div", "", rows));
}

function preview(design: DesignSystem, name: string, props: ComponentProps): HTMLElement {
  const node = el("div", "component-preview", [name]);
  const styles: Array<[keyof ComponentProps, (value: string | Typography) => void]> = [
    ["backgroundColor", (v) => (node.style.background = String(v))],
    ["textColor", (v) => (node.style.color = String(v))],
    ["rounded", (v) => (node.style.borderRadius = String(v))],
    ["padding", (v) => (node.style.padding = String(v))],
    ["width", (v) => (node.style.width = String(v))],
    ["height", (v) => (node.style.height = `min(${String(v)}, ${PREVIEW_MAX_HEIGHT}px)`)],
    ["typography", (v) => typeof v === "object" && applyTypography(node, v)],
  ];
  for (const [key, apply] of styles) {
    const value = props[key];
    if (value) apply(resolve(design, value));
  }
  return node;
}

function components(design: DesignSystem): HTMLElement {
  const cards = Object.entries(design.components).map(([name, props]) => {
    const meta = Object.entries(props).map(([k, v]) => `${k}: ${v}`);
    const fg = props.textColor && resolve(design, props.textColor);
    const bg = props.backgroundColor && resolve(design, props.backgroundColor);
    if (typeof fg === "string" && typeof bg === "string") meta.push(`contrast: ${ratio(fg, bg)}`);
    return el("article", "component", [
      el("div", "component-stage", [preview(design, name, props)]),
      el("pre", "component-meta", [meta.join("\n")]),
    ]);
  });
  return section(
    "Components",
    `Token recipes only. Borders, hover and motion live in the DESIGN.md prose. Heights over ${PREVIEW_MAX_HEIGHT}px are clipped.`,
    el("div", "components", cards),
  );
}

function render(root: HTMLElement): void {
  const design = parseDesign(source);
  root.append(
    el("header", "masthead", [
      el("p", "label", ["DESIGN.md / SPECIMEN"]),
      el("h1", "", [design.name]),
      el("p", "note", [design.description]),
    ]),
    colors(design),
    typography(design),
    spacing(design),
    rounded(design),
    components(design),
  );
}

const root = document.getElementById("app");
if (!root) throw new Error("#app is missing from index.html");
render(root);
