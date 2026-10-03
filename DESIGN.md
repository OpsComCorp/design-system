---
version: alpha
name: OpsCom
description: "The opscom.io homepage system: cool paper ground, near-black ink, one working blue, Archivo headlines over Instrument Sans text, large rounded media and pill buttons."
colors:
  background: "#f2f3f6"
  foreground: "#18191d"
  primary: "#18191d"
  primary-foreground: "#ffffff"
  muted: "#e6e8ec"
  muted-foreground: "#575b64"
  accent: "#e2e4e9"
  border: "#d2d5dc"
  brand: "#3859e8"
  destructive: "#a44832"
  glass: "#ffffffed"
  background-dark: "#17181c"
  foreground-dark: "#fafafa"
  primary-dark: "#f2f3f6"
  primary-foreground-dark: "#18191d"
  muted-dark: "#454750"
  muted-foreground-dark: "#b6bac5"
  accent-dark: "#454750"
  border-dark: "#454750"
  brand-dark: "#8a9eff"
  destructive-dark: "#ff8a6b"
typography:
  headline-display:
    fontFamily: Archivo
    fontSize: 110px
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: -0.052em
  headline-xl:
    fontFamily: Archivo
    fontSize: 76px
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: -0.052em
  headline-lg:
    fontFamily: Archivo
    fontSize: 68px
    fontWeight: 500
    lineHeight: 1.07
    letterSpacing: -0.047em
  headline-md:
    fontFamily: Archivo
    fontSize: 58px
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: -0.045em
  headline-sm:
    fontFamily: Archivo
    fontSize: 42px
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: -0.035em
  title-lg:
    fontFamily: Archivo
    fontSize: 36px
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: -0.035em
  title-md:
    fontFamily: Archivo
    fontSize: 26px
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: -0.035em
  title-sm:
    fontFamily: Instrument Sans
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: -0.025em
  body-lg:
    fontFamily: Instrument Sans
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
  body-md:
    fontFamily: Instrument Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: Instrument Sans
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
  label-lg:
    fontFamily: Instrument Sans
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
  label-md:
    fontFamily: Instrument Sans
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  label-sm:
    fontFamily: Instrument Sans
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0.05em
rounded:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 18px
  2xl: 22px
  full: 9999px
spacing:
  gutter-sm: 22px
  gutter-md: 24px
  gutter-lg: 88px
  content-max: 1640px
  gap-sm: 20px
  gap-md: 30px
  gap-lg: 48px
  section-sm: 72px
  section-md: 100px
  section-lg: 148px
  header-height: 112px
  touch-target: 44px
  breakpoint-md: 760px
  breakpoint-lg: 1100px
  breakpoint-2xl: 1700px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 12px 22px
    height: 48px
  button-primary-hover:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.primary-foreground}"
  button-glass:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.foreground}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 12px 22px
    height: 48px
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 10px 20px
    height: 44px
  button-destructive:
    backgroundColor: "{colors.background}"
    textColor: "{colors.destructive}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 10px 20px
    height: 44px
  nav-link:
    textColor: "{colors.foreground}"
    typography: "{typography.label-lg}"
    padding: 8px 0
  section-label:
    textColor: "{colors.foreground}"
    typography: "{typography.label-sm}"
  section-description:
    backgroundColor: "{colors.background}"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.body-md}"
    width: 215px
  tab:
    textColor: "{colors.foreground}"
    typography: "{typography.title-sm}"
    padding: 20px 0
  tab-selected:
    backgroundColor: "{colors.background}"
    textColor: "{colors.brand}"
    typography: "{typography.title-sm}"
  product-panel:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.foreground}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.lg}"
    padding: 18px 24px
  product-screen:
    backgroundColor: "{colors.muted}"
    padding: 22px
    height: 460px
  media-stage:
    rounded: "{rounded.2xl}"
    height: 680px
  use-case-media:
    rounded: "{rounded.md}"
  dialog:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
    padding: 24px
  band-dark:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.foreground-dark}"
    padding: 96px 0 42px
  band-dark-description:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.muted-foreground-dark}"
    typography: "{typography.body-md}"
  band-dark-accent:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.brand-dark}"
    typography: "{typography.headline-display}"
  band-dark-button:
    backgroundColor: "{colors.primary-dark}"
    textColor: "{colors.primary-foreground-dark}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    padding: 18px 24px
---

# OpsCom

## Overview

OpsCom sells instructor-led browser training exercises to public-safety and security
organizations: law enforcement, defense and security, private security, and the training
providers who serve them. The homepage at opscom.io ("Bring the world to your training.")
is the reference for this system. It speaks to training leads and buyers, mostly on
desktop and often on phones between other work.

The page should feel like a calm, expensive editorial: a cool off-white ground, near-black
type, big tightly tracked headlines, large rounded imagery, and lots of air. It is light by
default. The one dark band is reserved for "the future" section. Drama comes from scale
contrast (a 12px uppercase label next to a 76px headline) and from the imagery, never from
color. There is one working color, a blue, and it appears only where something is
interactive or selected.

**Scope.** These tokens come from the opscom.io homepage
(`landing-v3/components/world-landing/world-landing.css`) and match what the live page
computes. Other landing-v3 routes still carry older, route-scoped palettes and are not
described here: the buyer journey (`/mct`, `/organizations`, `/pricing`, `/providers`),
the First Watch content pages (`/about`, `/contact`, legal, `/droneops`), `/brief`,
`/future` and `/first-watch`. Use this file for new work. Don't copy values from those
routes into it.

**shadcn/ui.** Most consumers are shadcn apps on Tailwind v4. `tokens/theme.css`, generated
from this file, supplies every variable shadcn expects. shadcn components then render in
these colors, fonts, radii and breakpoints with no further mapping.

## Colors

Color names follow shadcn/ui, so `DESIGN.md`, Tailwind classes (`bg-background`,
`text-muted-foreground`) and shadcn components all use the same words. Light is the
default. The `-dark` tokens fill shadcn's `.dark` block, which reproduces the homepage's
dark band. Put `class="dark"` on a section for a band, or on `<html>` for a whole page.

- **Paper** (`background`, #f2f3f6): the page ground, plus cards, popovers and dialogs. It
  is a cool gray-white, not warm cream.
- **Ink** (`foreground`, #18191d): all headlines and default text.
- **Ink button** (`primary`, #18191d): the resting fill of the main button. This is shadcn's
  default Button. **Blue is not primary.**
- **White** (`primary-foreground`, #ffffff): text on Ink and on Blue.
- **Screen** (`muted`, #e6e8ec): the well a product screenshot sits in. In shadcn: skeletons,
  tab lists, quiet fills.
- **Muted** (`muted-foreground`, #575b64): descriptions next to headlines, card body copy,
  footnotes, captions. 6.13:1 on Paper.
- **Panel** (`accent`, #e2e4e9): the product screenshot panel. In shadcn: hover fills on
  ghost buttons and menu items. The panel's header divider is #cdd0d8.
- **Line** (`border`, #d2d5dc): 1px hairlines for section top borders, tab dividers, the
  rule under card links, and the dialog close button. Inputs use it too.
- **Blue** (`brand`, #3859e8): selected tab, button hover, focus ring, text selection.
  Never decorative, and never a resting fill. 5.03:1 on Paper.
- **Rust** (`destructive`, #a44832): delete actions and form errors. It does not appear on
  the homepage. It is taken from the approved buyer-journey palette
  (`landing-v3/components/buyer-journey/buyer-journey.css`) because shadcn needs a
  destructive color. 5.33:1 on Paper.
- **Glass** (`glass`, #ffffffed): a button laid over photography.

Dark (`.dark`), from the homepage's "Today, a browser. Tomorrow, step inside." band:

- **Night** (`background-dark`, #17181c) with **night text** (`foreground-dark`, #fafafa).
- **Light button** (`primary-dark`, #f2f3f6, with `primary-foreground-dark` #18191d): the
  film's play button.
- **Night muted** (`muted-foreground-dark`, #b6bac5): descriptions. Chapter captions use
  #a5a8b2.
- **Night line** (`border-dark`, `muted-dark`, `accent-dark`, all #454750): the chapter
  progress track. It also serves as the dark hover and quiet fill.
- **Periwinkle** (`brand-dark`, #8a9eff): the highlighted second headline line, and the dark
  focus ring. Chapter progress fills with #aebaff.
- **Coral** (`destructive-dark`, #ff8a6b): dark errors, from landing-v3's First Watch alert
  color. 7.69:1 on Night.

shadcn variables that would only repeat a value above are not separate tokens.
`tokens/theme.css` derives them as follows:

- `card`, `popover` and `sidebar` take `background`.
- Every `*-foreground` not listed above takes `foreground`.
- `secondary` and `sidebar-accent` take `accent`.
- `input` and `sidebar-border` take `border`.
- `ring` and `sidebar-ring` take `brand`.
- `sidebar-primary` takes `primary`.

Chart colors (`chart-1` to `chart-5`) are not defined yet.

Media sits on near-black grounds while it loads: #080b0f behind the hero image, #0c0e12
behind the film, #dde0e3 behind use-case illustrations. The dialog backdrop is #070a10ca
with an 8px blur.

## Typography

Two faces. **Archivo** (weight 500) sets every h1–h3. **Instrument Sans** (weight 400) sets
everything else. landing-v3 self-hosts Instrument Sans under the name "OpsCom Instrument".
There is no monospace face on this page.

Weights are only ever 400 and 500. landing-v3's `app/globals.css` forces
`font-weight: 400 !important` on every element and 500 on h1–h6. Any heavier weight in a
component stylesheet never renders.

Headline sizes are fluid. The token is the desktop maximum, and the fluid rule is:

- **headline-display** (110px, `clamp(56px, 6.3vw, 110px)`): the dark-band headline.
- **headline-xl** (76px, `clamp(46px, 4.5vw, 76px)`; phones `clamp(39px, 10.8vw, 72px)`):
  the page h1. One per page.
- **headline-lg** (68px, `clamp(40px, 4.05vw, 68px)`; phones `clamp(37px, 10vw, 59px)`):
  section h2.
- **headline-md** (58px, `clamp(34px, 3.6vw, 58px)`): the closing call-to-action h2.
- **headline-sm** (42px, `clamp(29px, 2.7vw, 42px)`): audience h3 ("For organizations").
- **title-lg** (36px, `clamp(25px, 2.25vw, 36px)`): use-case card h3.
- **title-md** (26px): story h3 beside the product panel.
- **title-sm** (20px, Instrument Sans): tab labels.
- **body-lg** (18px): the page base size and standalone notes.
- **body-md** (16px): descriptions, card copy, story copy.
- **body-sm** (13px): footer, panel captions, exercise context.
- **label-lg** (15px): nav links and audience links.
- **label-md** (14px): pills, card links, text links.
- **label-sm** (12px, +0.05em, uppercase in markup): section labels such as
  "YOUR WORLD / YOUR PEOPLE", and panel headers.

Headlines track tight, from -0.035em to -0.052em, and the bigger the size, the tighter.
Body text uses normal tracking. Line height is 0.98–1.15 for headlines and 1.45–1.55 for
text.

## Layout

- **Frame:** content is capped at 1640px (`content-max`) and centered. Side gutters are
  `clamp(24px, 4.7vw, 88px)`, and 22px on phones.
- **Section header:** a three-column grid, `1fr 2.55fr 1fr`, 30px gap, bottom-aligned. The
  label sits in the left column, the headline in the middle, and a muted description
  (max 215px) on the right. Below 1100px it becomes two columns with the description under
  the headline. Below 760px it stacks.
- **Content grids:** three-up use-case cards with a 28px gap; story and panel in a
  `1fr 2.03fr` split with a 48px gap; audience row in three columns with a 48px gap.
- **Vertical rhythm:** sections open with 96–148px of top padding on desktop and 64–88px
  on phones. The header is 112px tall (88px on phones).
- **Breakpoints:** 760px (phone), 1100px (tablet), 1700px (wide). In Tailwind these replace
  `md`, `lg` and `2xl`; `sm` (640px) and `xl` (1280px) keep their defaults.
- **Touch targets:** at least 44px tall on phones, for pills, tabs (56px), card links and
  dialog buttons.

## Elevation & Depth

The page is flat. Hierarchy comes from tonal steps (Paper, then Panel, then Screen) and from
1px Line hairlines, not from shadows. There is exactly one shadow: the product screenshot,
`0 10px 24px #13192b12`. Overlays separate with blur instead of shadow: the glass play
button uses a 14px backdrop blur, and the dialog backdrop uses 8px.

## Shapes

- **xs** (4px): the product screenshot inside its panel, and chapter labels over film.
- **sm** (8px): film chapter thumbnails.
- **md** (12px): use-case illustrations; the product panel on phones.
- **lg** (16px): the product panel.
- **xl** (18px): the screenshot dialog.
- **2xl** (22px): the hero world stage and the film frame. This drops to 15px on phones.
- **full**: every button. landing-v3 writes 50px or 100px, which renders the same at
  these heights.

Large media is rounded. Text containers are not: cards are open columns separated by
whitespace and hairlines, not boxes.

## Components

- **button-primary (dark pill):** Ink (`primary`) fill, white label-md text, 48px tall (44px on phones),
  ending in a 5px round dot. On hover the fill turns Blue (`brand`) and the pill lifts 2px
  (`translateY(-2px)`, 0.2s). Use it for the one main action per view ("Let's talk").
- **button-glass:** the same pill in Glass, used only over photography. On hover it becomes
  solid white.
- **band-dark-button:** the large pill centered on the film: Paper (`primary-dark`) at 94%
  opacity, a 1px #ffffff88 border and a 14px backdrop blur, with a CSS triangle play mark.
- **button-outline:** a transparent pill with a 1px Line border, used for dialog close.
- **button-destructive:** the outline pill with Rust text, for delete and other
  irreversible actions. It never uses a solid Rust fill.
- **nav-link:** label-lg Ink text. On hover, a 1px underline grows from the left over
  0.22s. Nav links are hidden on phones; only the pill stays.
- **text link:** Ink text, underlined with a 4px offset. Links are never Blue.
- **section-label:** label-sm, uppercase, +0.05em, two topics joined by a slash
  ("THE EXPERIENCE / TODAY").
- **tab:** a full-width row with a Line bottom border. It holds a 12px step number, a
  title-sm label and a +/− mark pushed to the right. Selected or hovered, the text turns
  Blue. No fill, no underline.
- **product-panel:** a Panel card (16px radius) with a label-sm header row, a #cdd0d8
  divider, the Screen well holding a contained screenshot (4px radius, the one shadow),
  and a caption row with an underlined "expand" text button.
- **use-case card:** a 4:3 illustration (12px radius), then a title-lg h3, body-md Muted
  copy capped at 35ch, and a link row pinned to the bottom with a Line border that darkens
  to Ink on hover and ends in "↗".
- **media-stage:** the hero image in a 22px-radius frame, 440–680px tall, with a
  bottom-60% gradient to #06080bb3 and a white caption row holding a glass pill.
- **band-dark:** the Night section, made with `class="dark"`. It uses the `-dark` colors
  throughout, a Periwinkle second
  headline line, a 16:9 film with chapter thumbnails, and a 2px progress bar per chapter.
- **dialog:** a native `<dialog>` on Paper with an 18px radius and 24px padding, at most
  1180px wide and 90dvh tall.
- **focus:** `outline: 3px solid` Blue (`ring`) with a 5px offset on every link, button and
  focusable element. Text selection is Blue with white text.

**Motion:** 0.2s for color and transform, 0.22s for underlines, 0.7s
`cubic-bezier(.2,.65,.3,1)` for image scale. Every animation and transition is switched off
under `prefers-reduced-motion: reduce`.

## Do's and Don'ts

- Do use Blue (`brand`) only for state: selected, hover, focus, selection. A resting
  button is `primary` (Ink), and a resting link is underlined Ink. Never set `primary` to
  Blue.
- Don't use any weight other than 400 for text and 500 for h1–h3; heavier weights are
  overridden site-wide.
- Do open every section with the three-column header: an uppercase slash label, a tight
  Archivo headline, and a short Muted description.
- Do round large media (12–22px) and leave text columns unboxed. Don't put copy in
  bordered or shadowed cards.
- Don't add shadows. The product screenshot owns the only one; separate everything else
  with Line hairlines and tonal steps.
- Do keep exactly one dark band per page, and use it for forward-looking content only.
- Do caption imagery honestly: concept art says "Concept visual"; footage says what it is.
- Don't introduce a monospace face, a second decorative color (Rust is for destructive
  actions only), gradients on surfaces, or icons as decoration. The arrows (↗, +, −) are text glyphs.
- Do give shadcn's Button `rounded-full` in the app's `components/ui/button.tsx`. The tokens
  set the radius scale, but only the component knows it is a pill.
- Do keep every interactive target at least 44px tall on phones, and give every animation
  a `prefers-reduced-motion` escape.
