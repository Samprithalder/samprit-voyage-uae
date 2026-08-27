# Voyage UAE

This project presents the United Arab Emirates through an interactive, editorial travel guide. Visitors can browse landmark themes and generate a suggested itinerary based on an Emirate, travel interest, and trip duration.
The website was created with the assistance of **Manus**, **Claude**, and **Gemini**. Manus and Claude supported the project’s development workflow, planning, content, and implementation work, while Gemini powers the server-side itinerary-generation feature. The application itself is a React and TypeScript project built with Vite and deployed with a Vercel-compatible API endpoint.

| Item              | Details                                                                     |
| ----------------- | --------------------------------------------------------------------------- |
| Project type      | Responsive single-page React travel guide                                   |
| Audience          | Visitors who want to discover UAE culture, nature, and modern landmarks     |
| Core interaction  | Select an Emirate, interest, and duration to request a suggested itinerary  |
| Active route      | `/` renders the guide; `/404` and unmatched paths render a 404 page         |
| Client stack      | React 19, TypeScript, Vite, Tailwind CSS 4, Wouter                          |
| UI foundation     | shadcn-style UI primitives, Radix UI, Lucide icons, and custom CSS          |
| AI feature        | Google Gemini is called only through `POST /api/itinerary`                  |
| Deployment target | Vercel static output in `dist/public` with a root-level serverless endpoint |

## Contents

| Section                                                                 | Description                                                                             |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [Project overview](#project-overview)                                   | Explains the purpose, visitor experience, and main features.                            |
| [How the itinerary generator works](#how-the-itinerary-generator-works) | Describes the browser-to-Gemini request flow.                                           |
| [Technology and acknowledgments](#technology-and-acknowledgments)       | Lists the stack and the Manus, Claude, and Gemini contribution disclosure.              |
| [Quick start](#quick-start)                                             | Provides local installation, type-checking, build, and start commands.                  |
| [Environment variables](#environment-variables)                         | Explains required settings and the separation between public configuration and secrets. |
| [Architecture](#architecture)                                           | Maps application runtime components.                                                    |
| [Project structure](#project-structure)                                 | Shows the repository at a glance.                                                       |
| [Complete file reference](#complete-file-reference)                     | Documents every tracked project file.                                                   |
| [Customization guide](#customization-guide)                             | Identifies the correct files to edit for common changes.                                |
| [Deployment notes](#deployment-notes)                                   | Explains Vercel and standalone hosting considerations.                                  |

## Project overview

Voyage UAE is designed as a guided story through the country instead of a generic travel dashboard. The home page contains a hero section, student profile, an explanation of AI in travel, landmark filters, travel problem and solution content, an itinerary generator, project impact cards, and a conclusion. Header links scroll to sections on the same page.

The landmark section offers four client-side categories: **All UAE**, **Culture & Heritage**, **Nature & Mountains**, and **Modern Landmarks**. The current cards feature Louvre Abu Dhabi, Al Fahidi, and Jebel Jais. These cards are held in the `landmarkCards` array in `client/src/pages/Home.tsx`, so their content can be changed without adding a backend or database. [1]

The visual system is called **Atlas of Warm Stone** in the project design notes. It combines deep emerald, champagne, paper, and sand colors with DM Serif Display headings, Manrope body text, route rails, coordinate labels, skyline linework, and responsive behavior. [1]

| Feature            | Current behavior                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| Landmark filtering | Uses React state and `useMemo` to show cards matching the selected topic.                        |
| Section navigation | Uses anchor links and smooth browser scrolling.                                                  |
| AI explanation     | Presents the role of location information, suggestions, and UAE values in travel planning.       |
| Itinerary form     | Offers eight Emirates/options, three interests, and three duration labels.                       |
| Itinerary feedback | Shows an accessible skeleton while a route is generated, then renders title, summary, and stops. |
| Error resilience   | Uses a React error boundary and displays a user-facing alert when itinerary generation fails.    |
| Responsive design  | Adapts navigation, route rails, grids, forms, and hero composition for mobile and desktop.       |

## How the itinerary generator works

The browser sends a `POST` request to `/api/itinerary` when the visitor selects **Generate itinerary**. The root-level `api/itinerary.ts` handler reads `GEMINI_API_KEY` from the server environment, sends a structured prompt to Google’s Generative Language API, removes possible Markdown fences, parses the returned JSON, and sends the itinerary object back to the page.

```
Visitor selects preferences in Home.tsx
              │
              ▼
client/src/script.ts posts JSON to /api/itinerary
              │
              ▼
api/itinerary.ts reads GEMINI_API_KEY on the server
              │
              ▼
Google Gemini generates itinerary JSON
              │
              ▼
Home.tsx displays itinerary title, summary, and route stops
```

The current response contract has three top-level properties: `title`, `summary`, and `stops`. Each stop contains `day`, `timing`, `name`, `emirate`, and `note`. If this contract changes, update both `api/itinerary.ts` and `client/src/pages/Home.tsx` together.

> **Important:** Keep `api/itinerary.ts`. It is the production Vercel endpoint that powers the Gemini itinerary generator. The `client/api/itinerary.ts` file is a secondary copy of similar handler logic; keep it until the deployed endpoint is confirmed and any duplication is intentionally resolved.

## Technology and acknowledgments

| Technology or tool                   | Role in the project                                                                     |
| ------------------------------------ | --------------------------------------------------------------------------------------- |
| React 19                             | Renders the component-based browser user interface.                                     |
| TypeScript                           | Provides typed client, configuration, and serverless source code.                       |
| Vite                                 | Runs the development server and builds the browser bundle.                              |
| Tailwind CSS 4                       | Supplies utility styling and semantic design tokens.                                    |
| Custom CSS                           | Delivers the bespoke Voyage UAE editorial travel-guide appearance.                      |
| Wouter                               | Provides lightweight client-side route matching.                                        |
| Radix UI and shadcn-style components | Supply accessible reusable UI primitives.                                               |
| Lucide React                         | Provides interface icons.                                                               |
| Vercel                               | Hosts the static build and root `api/itinerary.ts` serverless route.                    |
| Gemini                               | Generates itinerary content through a server-side API request.                          |
| Manus                                | Assisted with the website’s project development workflow, planning, and implementation. |
| Claude                               | Assisted with the website’s project development workflow, planning, and implementation. |

## Quick start

### Prerequisites

Install a current Node.js version and pnpm. The project is an ECMAScript module project and its dependencies are pinned in `pnpm-lock.yaml`. [1]

### Installation and development

```bash
git clone https://github.com/Samprithalder/samprit-voyage-uae.git
cd samprit-voyage-uae
pnpm install
pnpm dev
```

The Vite configuration requests port `3000` and uses a different available port if needed. Open the local URL printed in the terminal. The page will automatically refresh after source changes.

### Validation and production build

| Command       | Purpose                                                                            |
| ------------- | ---------------------------------------------------------------------------------- |
| `pnpm dev`    | Starts the Vite development server.                                                |
| `pnpm check`  | Runs TypeScript type checking without writing output.                              |
| `pnpm format` | Applies Prettier formatting across the project.                                    |
| `pnpm build`  | Builds the Vite frontend to `dist/public` and bundles the Express fallback server. |
| `pnpm start`  | Runs the built Express static fallback server.                                     |

```bash
pnpm check
pnpm build
pnpm start
```

The normal Vite development server does not independently host the Vercel function. The Gemini itinerary feature requires a deployed Vercel environment or an equivalent local serverless environment with `GEMINI_API_KEY` configured server-side.

## Environment variables

Do not commit API keys, tokens, or private credentials. The repository’s `.gitignore` contains `.env*`, so a local `.env.local` file is ignored by Git. Keep secrets in the deployment platform’s environment-variable settings for production.

| Variable                    | Type                                   | Used by                        | Purpose                                                                                 |
| --------------------------- | -------------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------- |
| `GEMINI_API_KEY`            | **Secret**                             | `api/itinerary.ts`             | Authorizes Gemini calls from the serverless endpoint. Never place it in browser source. |
| `VITE_ANALYTICS_ENDPOINT`   | Public configuration                   | `client/index.html`            | Provides the optional Umami analytics endpoint.                                         |
| `VITE_ANALYTICS_WEBSITE_ID` | Public identifier                      | `client/index.html`            | Provides the optional Umami website identifier.                                         |
| `VITE_OAUTH_PORTAL_URL`     | Public configuration if OAuth is added | `client/src/const.ts`          | Used by the optional login-URL helper.                                                  |
| `VITE_APP_ID`               | Public identifier if OAuth is added    | `client/src/const.ts`          | Used by the optional login-URL helper.                                                  |
| `BUILT_IN_FORGE_API_URL`    | Runtime-specific configuration         | Vite development storage proxy | Enables hosted development storage proxy behavior.                                      |
| `BUILT_IN_FORGE_API_KEY`    | Runtime-specific secret                | Vite development storage proxy | Authorizes hosted development storage proxy behavior.                                   |

Vite exposes variables prefixed with `VITE_` to browser code after bundling. Therefore, do not use names such as `VITE_GEMINI_API_KEY` or `VITE_SECRET`. Keep `GEMINI_API_KEY` unprefixed and in server-side environment configuration only. [2]

Example local file:

```
GEMINI_API_KEY=replace-with-your-private-key
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=your-public-site-id
```

## Architecture

```
Browser
  │
  ├── client/index.html
  └── client/src/main.tsx
        │
        ▼
      client/src/App.tsx
        │
        ├── Home.tsx: main travel guide
        ├── NotFound.tsx: fallback page
        ├── Theme provider, tooltip provider, toast host, error boundary
        └── script.ts: POST /api/itinerary
                          │
                          ▼
               api/itinerary.ts on Vercel
                          │
                          ▼
                Gemini Generative Language API
```

`server/index.ts` is a separate Express fallback for a conventional Node deployment. It serves the static build and returns `index.html` for client-side routes. Vercel instead uses the static output plus its serverless route convention.

## Project structure

```
samprit-voyage-uae/
├── api/                         # Production Vercel itinerary endpoint
├── client/
│   ├── api/                     # Secondary itinerary-handler copy
│   ├── public/                  # Browser-served assets and runtime support file
│   ├── src/
│   │   ├── components/          # Application support and UI primitives
│   │   ├── contexts/            # Theme context
│   │   ├── hooks/               # Reusable React hooks
│   │   ├── lib/                 # Utility functions
│   │   ├── pages/               # Home and 404 pages
│   │   ├── App.tsx              # Providers and route configuration
│   │   ├── main.tsx             # React browser entry point
│   │   ├── script.ts            # Itinerary request options and helper
│   │   ├── index.css            # Global Tailwind styles and tokens
│   │   └── styles.css           # Voyage UAE custom styling
│   └── index.html               # HTML document entry point
├── patches/                     # pnpm patch for Wouter
├── server/                      # Express static-server fallback
├── shared/                      # Shared constants
├── voyage-uae/client/public/    # Additional landmark image assets
├── package.json                 # Commands and dependency manifest
├── pnpm-lock.yaml               # Dependency lockfile
├── vite.config.ts               # Vite configuration
└── vercel.json                  # Vercel deployment configuration
```

## Complete file reference

This section documents **every file tracked by Git** in the repository at the documented revision. Files described as reusable, secondary, optional, or planning-oriented are still included because they are part of the project.

### Root files

| File                 | Purpose                                                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.gitignore`         | Excludes local dependencies, build output, environment files, and other generated files from Git. It includes the `.env*` protection rule.              |
| `.gitkeep`           | Empty placeholder file stored at the repository root. It has no runtime behavior.                                                                       |
| `.prettierignore`    | Identifies files and directories Prettier should ignore.                                                                                                |
| `.prettierrc`        | Defines the project’s code-formatting preferences.                                                                                                      |
| `README.md`          | Main project documentation, including setup, architecture, acknowledgments, and file descriptions.                                                      |
| `components.json`    | shadcn UI configuration: New York style, TSX, CSS-variable use, Tailwind CSS path, and import aliases.                                                  |
| `ideas.md`           | Design notes that describe possible visual directions and the selected Atlas of Warm Stone approach.                                                    |
| `package.json`       | Defines project metadata, pnpm commands, runtime dependencies, and development dependencies.                                                            |
| `pnpm-lock.yaml`     | Locks exact direct and transitive package versions for repeatable pnpm installs.                                                                        |
| `template.json`      | Static-project template metadata and source snapshot from the project’s original template.                                                              |
| `tsconfig.json`      | Main TypeScript compiler settings, included paths, and `@`/`@shared` aliases.                                                                           |
| `tsconfig.node.json` | TypeScript settings used for Node/Vite configuration files.                                                                                             |
| `vercel.json`        | Defines the Vercel build command, `dist/public` output directory, and SPA rewrite behavior.                                                             |
| `vite.config.ts`     | Configures React, Tailwind, JSX-location tooling, aliases, build output, dev-server settings, debug collection, and development storage proxy behavior. |

### API, server, patch, and shared files

| File                         | Purpose                                                                                                                                                                                 |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api/itinerary.ts`           | **Required production Vercel function.** Receives the itinerary request, reads the Gemini key server-side, tries configured Gemini models, parses JSON, and returns the itinerary.      |
| `client/api/itinerary.ts`    | Secondary Gemini itinerary-handler copy inside the client tree. It is maintained as a comparable handler source and should not be removed until deployment behavior has been confirmed. |
| `server/index.ts`            | Express fallback server used by `pnpm start`. Serves static output and returns `index.html` for client-side routing.                                                                    |
| `shared/const.ts`            | Defines `COOKIE_NAME` and `ONE_YEAR_MS` session-oriented constants.                                                                                                                     |
| `patches/wouter@3.7.1.patch` | Applies a pnpm patch to Wouter that records declared route paths on `window.__WOUTER_ROUTES__`.                                                                                         |

### Application entry points, routes, styles, and utilities

| File                                      | Purpose                                                                                                                                                                            |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `client/index.html`                       | Vite HTML shell. Sets browser metadata, page title, Google font loading, favicon, React root, and optional analytics script placeholders.                                          |
| `client/src/main.tsx`                     | Creates the React root in `#root`, renders `App`, and loads the shared stylesheet.                                                                                                 |
| `client/src/App.tsx`                      | Wraps the application in an error boundary, theme provider, tooltip provider, and toast host; then configures `/`, `/404`, and fallback routes.                                    |
| `client/src/pages/Home.tsx`               | Main page. Defines landmark cards and tabs, renders all travel-guide content, manages form and result state, calls `generateItinerary`, and renders the itinerary skeleton/result. |
| `client/src/pages/NotFound.tsx`           | Styled 404 page with an accessible action that navigates back to the home route.                                                                                                   |
| `client/src/script.ts`                    | Defines Emirates, interests, durations, request parameters, and the browser helper that posts to `/api/itinerary`.                                                                 |
| `client/src/const.ts`                     | Re-exports shared session constants and provides `getLoginUrl( )` for a potential OAuth sign-in flow.                                                                              |
| `client/src/index.css`                    | Imports Tailwind and animation CSS, declares semantic light/dark tokens, applies base styles, and defines container behavior.                                                      |
| `client/src/styles.css`                   | Implements the Voyage UAE design language: colors, typography, hero, navigation, route rails, cards, itinerary UI, animations, breakpoints, and reduced-motion behavior.           |
| `client/src/imageLoader.ts`               | Provides hosted image paths in compatible environments and inline SVG fallbacks for logo, hero, and landmark images in local use.                                                  |
| `client/src/lib/utils.ts`                 | Defines `cn()`, a helper that combines conditional class names and resolves Tailwind class conflicts.                                                                              |
| `client/src/components/ErrorBoundary.tsx` | Catches rendering errors and displays a reload interface instead of an unhandled blank page.                                                                                       |
| `client/src/components/ManusDialog.tsx`   | Reusable controlled or uncontrolled sign-in dialog with optional logo, title, close handling, and login callback.                                                                  |
| `client/src/components/Map.tsx`           | Reusable Google Maps wrapper with center, zoom, markers, click handling, script loading, and a no-key fallback.                                                                    |
| `client/src/contexts/ThemeContext.tsx`    | Provides light/dark theme state and optional local-storage persistence through `useTheme()`.                                                                                       |
| `client/src/hooks/useComposition.ts`      | Manages input-method composition behavior and blocks unwanted Enter/Escape propagation during composition.                                                                         |
| `client/src/hooks/useMobile.tsx`          | Returns whether the viewport width is below the 768px mobile breakpoint.                                                                                                           |
| `client/src/hooks/usePersistFn.ts`        | Returns a stable callback that always invokes the latest supplied function.                                                                                                        |

### Reusable UI primitives

| File                                           | Purpose                                                                                  |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `client/src/components/ui/accordion.tsx`       | Expand/collapse disclosure controls.                                                     |
| `client/src/components/ui/alert-dialog.tsx`    | Modal confirmation-dialog primitives.                                                    |
| `client/src/components/ui/alert.tsx`           | Semantic alert container, title, and description.                                        |
| `client/src/components/ui/aspect-ratio.tsx`    | Responsive media aspect-ratio wrapper.                                                   |
| `client/src/components/ui/avatar.tsx`          | Avatar image and fallback components.                                                    |
| `client/src/components/ui/badge.tsx`           | Compact status/label badge and variants.                                                 |
| `client/src/components/ui/breadcrumb.tsx`      | Accessible breadcrumb navigation helpers.                                                |
| `client/src/components/ui/button-group.tsx`    | Layout container for related buttons.                                                    |
| `client/src/components/ui/button.tsx`          | Reusable button and variants; used by the 404 page and sign-in dialog.                   |
| `client/src/components/ui/calendar.tsx`        | Styled day-picker calendar.                                                              |
| `client/src/components/ui/card.tsx`            | Card surface, header, content, footer, title, and description components.                |
| `client/src/components/ui/carousel.tsx`        | Embla-based carousel context, items, and navigation controls.                            |
| `client/src/components/ui/chart.tsx`           | Recharts container, configuration, tooltip, and legend helpers.                          |
| `client/src/components/ui/checkbox.tsx`        | Styled checkbox control.                                                                 |
| `client/src/components/ui/collapsible.tsx`     | Collapsible root, trigger, and content components.                                       |
| `client/src/components/ui/command.tsx`         | Command-menu palette components based on `cmdk`.                                         |
| `client/src/components/ui/context-menu.tsx`    | Context-menu and submenu controls.                                                       |
| `client/src/components/ui/dialog.tsx`          | Dialog root, overlay, content, header, footer, title, and description components.        |
| `client/src/components/ui/drawer.tsx`          | Vaul-based mobile drawer components.                                                     |
| `client/src/components/ui/dropdown-menu.tsx`   | Dropdown menu, radio, checkbox, and submenu components.                                  |
| `client/src/components/ui/empty.tsx`           | Empty-state layout, icon, text, and action components.                                   |
| `client/src/components/ui/field.tsx`           | Form-field layout, labels, descriptions, separators, and errors.                         |
| `client/src/components/ui/form.tsx`            | React Hook Form integration with field context and validation messages.                  |
| `client/src/components/ui/hover-card.tsx`      | Hover-triggered preview-card components.                                                 |
| `client/src/components/ui/input-group.tsx`     | Grouped input layout with add-ons, buttons, inputs, and text areas.                      |
| `client/src/components/ui/input-otp.tsx`       | One-time-password input group, slots, and separator.                                     |
| `client/src/components/ui/input.tsx`           | Styled standard text input with composition-event support.                               |
| `client/src/components/ui/item.tsx`            | General-purpose item/list layout, media, content, action, header, and footer components. |
| `client/src/components/ui/kbd.tsx`             | Keyboard shortcut keycap components.                                                     |
| `client/src/components/ui/label.tsx`           | Accessible form label component.                                                         |
| `client/src/components/ui/menubar.tsx`         | Desktop menu-bar controls, groups, items, and submenus.                                  |
| `client/src/components/ui/navigation-menu.tsx` | Rich navigation menu, triggers, content, indicators, and viewport.                       |
| `client/src/components/ui/pagination.tsx`      | Pagination navigation, links, previous/next controls, and ellipsis.                      |
| `client/src/components/ui/popover.tsx`         | Anchored popover root, trigger, content, and anchor.                                     |
| `client/src/components/ui/progress.tsx`        | Progress bar control.                                                                    |
| `client/src/components/ui/radio-group.tsx`     | Radio group and individual radio item controls.                                          |
| `client/src/components/ui/resizable.tsx`       | Resizable panel group, panels, and drag handle.                                          |
| `client/src/components/ui/scroll-area.tsx`     | Styled scroll area and scrollbar.                                                        |
| `client/src/components/ui/select.tsx`          | Styled select field, options, labels, separators, and scrolling controls.                |
| `client/src/components/ui/separator.tsx`       | Horizontal/vertical divider component.                                                   |
| `client/src/components/ui/sheet.tsx`           | Side-sheet modal and directional-content components.                                     |
| `client/src/components/ui/sidebar.tsx`         | Responsive sidebar system, menu components, rail, and shortcut support.                  |
| `client/src/components/ui/skeleton.tsx`        | General animated skeleton placeholder.                                                   |
| `client/src/components/ui/slider.tsx`          | Range slider, track, range, and thumb control.                                           |
| `client/src/components/ui/sonner.tsx`          | Configured Sonner toast host mounted by `App.tsx`.                                       |
| `client/src/components/ui/spinner.tsx`         | Visual loading spinner.                                                                  |
| `client/src/components/ui/switch.tsx`          | Toggle switch control.                                                                   |
| `client/src/components/ui/table.tsx`           | Semantic table layout components.                                                        |
| `client/src/components/ui/tabs.tsx`            | Tab root, list, trigger, and content components.                                         |
| `client/src/components/ui/textarea.tsx`        | Styled multi-line text input with composition-event support.                             |
| `client/src/components/ui/toggle-group.tsx`    | Grouped toggle controls.                                                                 |
| `client/src/components/ui/toggle.tsx`          | Individual pressed-state toggle and variants.                                            |
| `client/src/components/ui/tooltip.tsx`         | Tooltip provider, root, trigger, and content; the provider is mounted in `App.tsx`.      |

### Public and image assets

| File                                                   | Purpose                                                                             |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| `client/public/.gitkeep`                               | Placeholder file that preserves the public directory in version control.            |
| `client/public/__manus__/debug-collector.js`           | Development-runtime diagnostic collector used with matching Vite middleware.        |
| `client/public/assets/dubai-skyline-outline.jpg`       | 1920×1080 skyline outline used by the custom CSS as decorative background linework. |
| `client/public/assets/dubai-skyline.jpg`               | 3000×1707 full-color Dubai skyline image asset.                                     |
| `voyage-uae/client/public/assets/al-fahidi.jpg`        | 1056×615 image asset for Al Fahidi.                                                 |
| `voyage-uae/client/public/assets/burj-khalifa.jpg`     | 1152×648 image asset for Burj Khalifa.                                              |
| `voyage-uae/client/public/assets/grand-mosque.jpg`     | 1000×667 image asset for the Grand Mosque.                                          |
| `voyage-uae/client/public/assets/jebel-jais.jpg`       | 838×628 image asset for Jebel Jais.                                                 |
| `voyage-uae/client/public/assets/louvre-abu-dhabi.jpg` | 1360×765 image asset for Louvre Abu Dhabi.                                          |

## Customization guide

### Update page content and student details

Edit `client/src/pages/Home.tsx` to update the hero text, project profile, student details, navigation labels, travel explanation, problem/solution panels, impact cards, and footer. This component is the central place for the site’s displayed content.

### Add or modify landmark cards

Update the `landmarkCards` array in `client/src/pages/Home.tsx`. Each card has an image URL, location name, Emirate, and a `groups` array that determines which filters display it. If you add a category, add the same category ID to the `tabs` array.

```
{
  image: "/assets/your-landmark.jpg",
  name: "Your Landmark",
  emirate: "Dubai",
  groups: ["all", "modern"],
}
```

### Update itinerary choices or AI behavior

Edit `client/src/script.ts` to change the selectable Emirate, interest, or duration options. Edit `api/itinerary.ts` to adjust the Gemini prompt, preferred models, request handling, or returned itinerary structure. Keep the browser result interfaces in `Home.tsx` synchronized with the API response format.

### Change the visual identity

Use `client/src/styles.css` for Voyage UAE-specific colors, typography, layout, landmark cards, forms, animations, and responsive behavior. Use `client/src/index.css` for global Tailwind tokens and shared semantic UI styling. Font links and page metadata are located in `client/index.html`.

## Deployment notes

### Vercel deployment

The repository’s `vercel.json` runs `pnpm run build` and serves the Vite output from `dist/public`. Set `GEMINI_API_KEY` in the Vercel project’s Environment Variables settings. Do not commit it to Git or expose it with a `VITE_` prefix.

Before publicly sharing an AI-enabled deployment, add rate limiting and strict request validation to `/api/itinerary`. This helps protect Gemini quota, availability, and API spending. [3]

### Non-Vercel hosting

Run `pnpm build` to produce `dist/public`. The included `server/index.ts` can serve this static bundle using `pnpm start` and provides an SPA fallback. It does not implement the Gemini endpoint; a non-Vercel host needs an equivalent protected backend route for `/api/itinerary`.

---

**This was made with the help of Manus, Claude, and Gemini**.
