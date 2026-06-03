---
name: Royal Amethyst
colors:
  surface: '#f9f9ff'
  surface-dim: '#d8dae3'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3fd'
  surface-container: '#ecedf7'
  surface-container-high: '#e6e8f1'
  surface-container-highest: '#e0e2ec'
  on-surface: '#181c22'
  on-surface-variant: '#414753'
  inverse-surface: '#2d3038'
  inverse-on-surface: '#eff0fa'
  outline: '#717785'
  outline-variant: '#c1c6d5'
  surface-tint: '#8d36ab'
  primary: '#8a33a9'
  on-primary: '#ffffff'
  primary-container: '#a64fc4'
  on-primary-container: '#fffbff'
  inverse-primary: '#efb0ff'
  secondary: '#893aab'
  on-secondary: '#ffffff'
  secondary-container: '#db87fd'
  on-secondary-container: '#640c87'
  tertiary: '#5a5c5c'
  on-tertiary: '#ffffff'
  tertiary-container: '#737575'
  on-tertiary-container: '#fcfcfc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#fad7ff'
  primary-fixed-dim: '#efb0ff'
  on-primary-fixed: '#330045'
  on-primary-fixed-variant: '#721791'
  secondary-fixed: '#f8d8ff'
  secondary-fixed-dim: '#ebb2ff'
  on-secondary-fixed: '#320047'
  on-secondary-fixed-variant: '#6e1c91'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#f9f9ff'
  on-background: '#181c22'
  surface-variant: '#e0e2ec'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
---

# Royal Amethyst Design System

## Brand & Style
Royal Amethyst is a sophisticated, modern design system that balances regal elegance with digital precision. The brand personality is professional, creative, and highly polished, leaning into a "Modern Corporate" aesthetic with a touch of creative flair. It aims to evoke a sense of reliability and premium quality through its deep purple tones and clean, high-readability typography. The interface prioritizes clarity and a balanced structure, ensuring that users feel both inspired and in control.

## Colors
The color palette is anchored by a deep, authoritative primary purple (#7c249b) that drives the visual hierarchy and key interactions. This is complemented by a vibrant, lighter secondary purple (#bf6de1) used for accents and highlighting secondary actions. The tertiary color is a crisp, near-pure white (#fefefe), used to maintain a clean and airy feel. The system utilizes a "light" color mode as its default state.

## Typography
The system uses **Inter** across all levels to ensure maximum legibility and a contemporary technical feel. Inter’s neutral yet friendly character supports the brand's professional tone. 

- **Headlines:** Set in Inter with bold weights for strong visual hierarchy.
- **Body:** Inter at 16px with standard line height for optimal readability.
- **Labels:** Inter with medium weights for functional clarity.

## Layout & Spacing
The layout follows a 12-column fluid grid system designed for flexibility across device types. A standard spacing scale (base 2) drives all margins, paddings, and component dimensions. 

- **Gutter:** 16px
- **Margin:** 24px (Desktop) / 16px (Mobile)
- **Grid:** 12-column fluid grid

## Elevation & Depth
Visual hierarchy is established through a combination of tonal layering and soft, ambient shadows. Surfaces use subtle shifts in background color to denote depth, with higher-level elements featuring diffused, low-opacity shadows. This approach creates a sense of physical stacking that feels modern and lightweight.

## Shapes
The shape language is defined by a **Rounded** aesthetic. This softening of the UI helps balance the technical precision of the Inter typeface.
- **Base Roundedness:** 0.5rem (8px) for standard components.
- **Large Roundedness:** 1rem (16px) for cards and containers.
- **Extra Large:** 1.5rem (24px) for prominent surfaces.

## Components
- **Buttons:** Primary buttons use the deep purple (#7c249b) with white text; secondary buttons use the lighter purple (#bf6de1) or an outlined style. All buttons feature the standard 8px corner radius.
- **Cards:** Elevated with soft shadows and a 16px corner radius, providing a clear container for grouped information.
- **Inputs:** Clean, outlined fields with an 8px radius, using the primary purple for active focus states.
- **Chips:** Highly rounded (pill-shaped) using secondary color tints for categorization and filtering.
- **Lists:** Clean rows with subtle dividers and generous vertical padding.