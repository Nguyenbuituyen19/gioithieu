---
name: Cyber-Minimalist Portfolio
colors:
  surface: '#131314'
  surface-dim: '#131314'
  surface-bright: '#3a393a'
  surface-container-lowest: '#0e0e0f'
  surface-container-low: '#1c1b1c'
  surface-container: '#201f20'
  surface-container-high: '#2a2a2b'
  surface-container-highest: '#353436'
  on-surface: '#e5e2e3'
  on-surface-variant: '#c6c4d8'
  inverse-surface: '#e5e2e3'
  inverse-on-surface: '#313031'
  outline: '#908fa1'
  outline-variant: '#464555'
  surface-tint: '#c1c1ff'
  primary: '#c1c1ff'
  on-primary: '#1400a8'
  primary-container: '#5d5dff'
  on-primary-container: '#fefaff'
  inverse-primary: '#4644e9'
  secondary: '#d3fbff'
  on-secondary: '#00363a'
  secondary-container: '#00eefc'
  on-secondary-container: '#00686f'
  tertiary: '#ffb690'
  on-tertiary: '#542100'
  tertiary-container: '#bf5400'
  on-tertiary-container: '#fffbfa'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1dfff'
  primary-fixed-dim: '#c1c1ff'
  on-primary-fixed: '#09006b'
  on-primary-fixed-variant: '#2a21d2'
  secondary-fixed: '#7df4ff'
  secondary-fixed-dim: '#00dbe9'
  on-secondary-fixed: '#002022'
  on-secondary-fixed-variant: '#004f54'
  tertiary-fixed: '#ffdbca'
  tertiary-fixed-dim: '#ffb690'
  on-tertiary-fixed: '#331100'
  on-tertiary-fixed-variant: '#783200'
  background: '#131314'
  on-background: '#e5e2e3'
  surface-variant: '#353436'
typography:
  display-xl:
    fontFamily: Sora
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-xl-mobile:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.5'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  section-gap-desktop: 160px
  section-gap-mobile: 80px
---

## Brand & Style
The design system is engineered for a high-end Frontend Developer portfolio, blending **Minimalism** with **Glassmorphism** and **High-Contrast** tech accents. The brand personality is "The Architect of the Future"—precise, technical, yet deeply creative. 

The aesthetic focuses on a deep, obsidian-like dark mode that allows code and visual assets to pop through neon accents. It evokes a sense of "polished engineering," using generous whitespace to signify confidence and premium quality. Transitions should be fluid and intentional, mirroring the smoothness of a high-performance application.

## Colors
The palette is rooted in a "True Dark" foundation to maximize contrast. 

- **Primary (Electric Indigo):** Used for primary actions, active states, and brand highlights.
- **Secondary (Neon Cyan):** Used for secondary accents, code syntax highlighting, and success indicators.
- **Background:** A deep `#0A0A0B` provides the canvas. 
- **Glass Surfaces:** Semi-transparent whites with heavy backdrop blurs create depth without adding visual weight.
- **Glows:** Use low-opacity radial gradients of the primary color to create "light leaks" behind key components, suggesting energy and depth.

## Typography
This design system utilizes a high-contrast typographic scale. **Sora** provides a tech-forward, geometric personality for headers, while **Inter** ensures maximum legibility for long-form content. 

**JetBrains Mono** is introduced as a supporting font for technical labels, tags, and snippets to reinforce the developer persona. Tighten letter spacing on large display text for a modern, "impactful" editorial look. Ensure all body text maintains high contrast against the dark background (using off-white `#EDEDED` rather than pure white to reduce eye strain).

## Layout & Spacing
The layout follows a **Fluid Grid** model with an emphasis on "negative space as a feature." 

- **Desktop:** 12-column grid with wide margins (standard 80px+). Use large section gaps (160px) to separate case studies and project phases.
- **Mobile:** 4-column grid with 20px margins. 
- **Alignment:** Content should be primarily left-aligned to maintain a clean vertical rhythm, with occasional center-aligned "hero" moments for emphasis.
- **Rhythm:** Use an 8px base unit for all internal component spacing (padding, gaps).

## Elevation & Depth
Depth is achieved through **Glassmorphism** and **Tonal Layering** rather than traditional drop shadows.

1.  **Base Layer:** Pure dark background.
2.  **Mid Layer:** Subtle containers with `backdrop-filter: blur(12px)` and a 1px border of `rgba(255,255,255,0.1)`. 
3.  **Top Layer:** Floating elements (modals, tooltips) with a secondary `0.5px` inner glow and a soft, large-radius ambient shadow (`rgba(0,0,0,0.5)`).

Use "light-border" techniques: instead of heavy shadows, use a very thin, slightly bright top-border on cards to simulate a light source from above.

## Shapes
The design system uses a **Rounded** (Level 2) language. This balances the "sharpness" of the tech-focused typography with a sense of approachability and modern software aesthetics.

- **Buttons & Inputs:** 0.5rem (8px) corner radius.
- **Cards & Sections:** 1rem (16px) corner radius.
- **Feature Highlights:** 1.5rem (24px) for large containers.
- **Visual Elements:** Use subtle geometric shapes (circles or squircles) as background decorative elements with low-opacity blurs.

## Components
- **Buttons:** 
  - *Primary:* Solid Electric Indigo background, white text, subtle outer glow on hover.
  - *Secondary:* Glassmorphic background with a 1px border. On hover, the border transitions to the primary color.
- **Cards:** Glass containers with a `1px` stroke. Content should have generous 32px internal padding.
- **Chips/Tags:** Use the `label-mono` typography. Backgrounds should be low-opacity versions of the primary/secondary colors.
- **Input Fields:** Darker than the background or glassmorphic. On focus, the border glows with the primary color and the label shifts upwards.
- **Transitions:** All interactive elements must use `cubic-bezier(0.4, 0, 0.2, 1)` for transitions, lasting 200-300ms.
- **Code Blocks:** Custom styled with the secondary neon cyan for brackets and operators, creating a "cyberpunk" terminal feel.
