# Agent guidelines for design-system

The OpsCom design system as one file. `DESIGN.md` follows the Google Stitch DESIGN.md spec
(format `alpha`, linted by `@google/design.md` 0.4.0) and describes the opscom.io homepage. Other pages on the site keep their own scoped
palettes and are out of scope. Most consumers are shadcn/ui apps on Tailwind v4.

## Source of truth

- **`DESIGN.md` is the only hand-written token source.** YAML front matter holds the
  values; the eight `##` sections explain them. Prose and tokens must agree.
- **Color names are shadcn's** (`background`, `foreground`, `primary`, `muted-foreground`,
  `border`…), so DESIGN.md, Tailwind classes and shadcn components share one vocabulary.
  `primary` is Ink (the resting button), and Blue is `brand`. Dark values use a `-dark`
  suffix.
- **`tokens/theme.css` is generated** by `scripts/build-theme.ts` (`pnpm tokens`), in the
  shape shadcn expects: `:root`, `.dark`, `@theme inline` for colors, and `@theme` for fonts,
  text levels (with line height, letter spacing and weight), radius, spacing and
  breakpoints. shadcn variables that only repeat a DESIGN.md color come from `ALIASES` in
  that script. Never edit the generated file. It is committed so apps can copy it.
- **`scripts/theme.test.ts` is the compatibility contract.** It compiles shadcn class names
  with Tailwind and checks each against DESIGN.md. It also fails when `theme.css` is stale.
- **The Vite page (`index.html`, `src/`) is the specimen.** It parses `DESIGN.md` at
  runtime and styles itself from `tokens/theme.css`.

## Updating values

1. Measure the value from the homepage source in the marketing-site repo, then confirm it
   on the live page's computed styles (the site forces weights to 400 and headings to 500).
2. Colors are hex only. Convert other formats with a script, never by hand.
3. A new color in DESIGN.md flows into `theme.css` automatically. A new shadcn variable
   that repeats an existing color goes in `ALIASES`, not in DESIGN.md.
4. Run `pnpm verify`. Lint must report 0 errors.
5. Contrast warnings on values taken from the product are findings to report, not tokens
   to adjust.

## Commands

```sh
pnpm dev        # regenerate tokens, then serve the specimen
pnpm lint       # design.md lint DESIGN.md
pnpm tokens     # DESIGN.md -> tokens/theme.css
pnpm test       # node --test: shadcn/Tailwind compatibility
pnpm verify     # lint, typecheck, tokens, test, build — run before declaring work done
```

CI: `.woodpecker/verify.yaml` on https://ci.opscom.io runs `pnpm verify` on every PR and master
push, then fails if the committed `tokens/theme.css` differs from a fresh `pnpm tokens`.

pnpm 12.4.2, Node >= 24 (runs `.ts` scripts directly). The specimen loads Archivo and
Instrument Sans from Google Fonts.
