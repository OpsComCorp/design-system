# OpsCom Design System

[`DESIGN.md`](DESIGN.md) describes how OpsCom looks, following the
[DESIGN.md spec](https://stitch.withgoogle.com/docs/design-md/specification). Its tokens and
rules come from the opscom.io homepage in `landing-v3`. Color names follow shadcn/ui.

```sh
pnpm install
pnpm dev       # specimen at http://localhost:5173
pnpm verify    # lint DESIGN.md, typecheck, regenerate tokens, shadcn tests, build
```

## Use it in a shadcn/ui app (Tailwind v4)

1. Run `shadcn init` as usual (any base, any preset).
2. Copy `tokens/theme.css` next to the app's `globals.css` / `index.css`.
3. In that file, **delete the `:root`, `.dark` and `@theme inline` blocks shadcn generated**,
   along with its font import, and import ours instead. If you leave shadcn's blocks in,
   they override ours: its `@theme inline` alone resets `--font-sans` to Geist and the
   radius scale to its own formulas.

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "./theme.css";

@custom-variant dark (&:is(.dark *));

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  html {
    @apply font-sans;
  }
}
```

4. Load the two faces and point the theme at them. The theme reads `--font-instrument-sans`
   and `--font-archivo`, and falls back to the plain family names.

```tsx
// Next.js
const instrument = Instrument_Sans({ variable: "--font-instrument-sans", subsets: ["latin"] });
const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], weight: ["500"] });
```

With fontsource, set `--font-instrument-sans: "Instrument Sans Variable"` and
`--font-archivo: "Archivo Variable"` on `:root`.

5. Later `shadcn add` runs may append CSS variables to the same file (charts, sidebar).
   Delete them; `theme.css` already defines everything except `chart-1`…`chart-5`.

What you get:

- **Colors:** `bg-primary` (Ink), `bg-brand` (Blue), `text-muted-foreground`,
  `bg-destructive`, `border-border`, `ring-ring` and every other shadcn color.
- **Dark sections:** `class="dark"` on any element switches it to the homepage's dark band.
- **Type:** `font-sans` (Instrument Sans) and `font-heading` (Archivo). `text-headline-xl`
  and the other levels set size, line height, letter spacing and weight together, so a
  headline is `font-heading text-headline-xl`.
- **Shapes and layout:** the `rounded-xs` through `rounded-2xl` scale, `px-gutter-lg`,
  `max-w-content-max`, `min-h-touch-target`.
- **Breakpoints:** `md:` at 760px, `lg:` at 1100px, `2xl:` at 1700px.

Fluid `clamp()` sizes, borders, hover and motion live in the `DESIGN.md` prose. AI agents
and Google Stitch read `DESIGN.md` directly.
