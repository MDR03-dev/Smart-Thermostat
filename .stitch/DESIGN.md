---
name: Lumina Home
colors:
  surface: '#f7fafc'
  surface-dim: '#d7dadc'
  surface-bright: '#f7fafc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f6'
  surface-container: '#ebeef0'
  surface-container-high: '#e5e9eb'
  surface-container-highest: '#e0e3e5'
  on-surface: '#181c1e'
  on-surface-variant: '#44474e'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eef1f3'
  outline: '#75777f'
  outline-variant: '#c5c6cf'
  surface-tint: '#4e5e81'
  primary: '#031635'
  on-primary: '#ffffff'
  primary-container: '#1a2b4b'
  on-primary-container: '#8293b8'
  inverse-primary: '#b6c6ef'
  secondary: '#006876'
  on-secondary: '#ffffff'
  secondary-container: '#58e6ff'
  on-secondary-container: '#006573'
  tertiary: '#330700'
  on-tertiary: '#ffffff'
  tertiary-container: '#571200'
  on-tertiary-container: '#ff5c29'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#b6c6ef'
  on-primary-fixed: '#081b3a'
  on-primary-fixed-variant: '#364768'
  secondary-fixed: '#a1efff'
  secondary-fixed-dim: '#44d8f1'
  on-secondary-fixed: '#001f25'
  on-secondary-fixed-variant: '#004e59'
  tertiary-fixed: '#ffdbd1'
  tertiary-fixed-dim: '#ffb5a0'
  on-tertiary-fixed: '#3b0900'
  on-tertiary-fixed-variant: '#862200'
  background: '#f7fafc'
  on-background: '#181c1e'
  surface-variant: '#e0e3e5'
  status-cooling: '#00BCD4'
  status-heating: '#FF5722'
  status-eco: '#4CAF50'
  surface-card: '#FFFFFF'
  text-primary: '#1A2B4B'
  text-secondary: '#64748B'
typography:
  display-temp:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '600'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
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
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding: 24px
  gutter: 16px
  stack-sm: 4px
  stack-md: 12px
  stack-lg: 24px
---

# Design System: IoT Home Thermal Dashboard
**Project ID:** projects/3996952565580076435

## 1. Visual Theme & Atmosphere

The design system is engineered for the modern smart home ecosystem, focusing on reliability, clarity, and intuitive control. It targets homeowners who value technology that integrates seamlessly into their lives without feeling clinical or overly complex.

The design style is **Corporate / Modern** with a strong emphasis on **Tonal Layering**. It leverages a "Tech-Forward" aesthetic that prioritizes high legibility and immediate visual feedback. The interface evokes a sense of calm and control through a balanced use of whitespace, intentional color signaling, and a sophisticated depth model that makes interactive elements feel tangible yet digital-native.

## 2. Color Palette & Roles

The color palette is built on a foundation of "Trust Blue" (`#1A2B4B`) to ground the interface in stability. 

- **Primary:** Used for high-level navigation, primary branding, and "On" states for standard devices.
- **Secondary (Cyan):** Dedicated to cooling states, water-related sensors, and active connectivity.
- **Tertiary (Orange):** Reserved specifically for heating elements, energy alerts, and high-priority active states.
- **Neutral:** A cool-toned light gray palette provides a soft backdrop that reduces eye strain during night use while maintaining a clean daytime appearance.

Backgrounds utilize subtle shifts in lightness to differentiate between the global canvas and individual control modules.

## 3. Typography Rules

This design system utilizes **Inter** exclusively to ensure maximum readability across various screen densities. The typographic scale is highly functional:

- **Display Numbers:** Specifically for temperature and humidity readings, using a semi-bold weight and tighter letter spacing for a "precision instrument" feel.
- **Hierarchy:** Clear distinction between room names (Headlines) and device statuses (Body/Labels).
- **Labels:** Use medium weights for data descriptors (e.g., "ENERGY USAGE") to ensure they remain legible at smaller sizes.

## 4. Component Stylings

### Control Cards
Cards are the primary building blocks. They feature a top-aligned icon, a central state title (e.g., "Living Room Light"), and a bottom-aligned toggle or slider. 

### Interactive Buttons
- **Scenario Buttons:** Large, square buttons for "Away," "Home," or "Sleep." Active states use a solid fill of the Primary color with white icons.
- **Temp Controls:** Large circular (+) and (-) buttons with high hit areas. Use the secondary (cooling) or tertiary (heating) colors as the accent for the value readout.

### Inputs & Sliders
- **Range Sliders:** Used for dimming and volume. These feature a thick track (8px) and a large, easy-to-grab thumb.
- **Toggles:** Use a standard pill-shaped switch. When "On," the track should animate into the Primary color.

### Chips & Badges
Small, low-contrast indicators used for secondary data like "Battery Low" or "Signal Strength." Use soft background tints of the status colors with high-contrast text.

### Charts & Graphs
Line charts for energy usage should use a smoothed "spline" stroke rather than sharp angles to maintain the soft, modern aesthetic.

## 5. Layout Principles

### Grid & Structure
- **Desktop/Tablet:** A 12-column grid. Devices and sensors are grouped into cards that span 3 or 4 columns.
- **Mobile:** A single-column flow with 16px side margins. Key controls (like the thermostat) expand to fill the width.
- **Rhythm:** An 8px linear scale governs all padding and margins. Use `stack-md` (12px) for spacing between elements within a card and `stack-lg` (24px) for spacing between major sections or rooms.

## 6. Design System Notes for Stitch Generation

### Language to Use
Describe the interface using "Modern Tech-Forward" vocabulary focusing on "Tonal Layering", "Whisper-soft diffused shadows", "approachable curved boundaries", and "precise control interfaces".

### Color References
- Surface: `#f7fafc`
- Primary (Trust Blue): `#031635` / `#1a2b4b`
- Secondary (Cooling Cyan): `#006876` / `#00bcd4`
- Tertiary (Heating Orange): `#ff5722`
- Neutral Canvas: `#f4f7f9`
- Text Primary: `#1A2B4B`
- Text Secondary: `#64748B`
