# Block Authoring Model (AEM-Editable Content)

This project keeps layout, styling, and behavior in code (`blocks/*`) while authors manage all inner content in AEM.

## Content/Code Separation

- **Code-managed:** block DOM transformation, CSS classes, responsive behavior, interactions.
- **AEM-managed:** headings, body text, images, links, button labels, card items, timeline entries.

## Block Field Mapping

### `hero`

- **Author in AEM:** one hero row with:
  - heading (`h1`)
  - body copy (`p`)
  - CTA link (`p.button-wrapper > a`)
  - hero image (`picture`)
- **Code does:** wraps content into overlay/content containers and adds carousel dots.
- **Optional config (block metadata):**
  - `slideCount`: number of carousel dots (default `4`)

### `stats-highlight`

- **Author in AEM:** first row with 2 columns:
  - intro column: heading + subtitle
  - metrics column: one item per metric (value + label, optional icon/image)
- **Code does:** applies metric classes and wraps value/label stack.

### `journey-timeline`

- **Author in AEM:**
  - row 1: intro heading and paragraph
  - row 2: list (`ul > li`) entries where each item contains:
    - year text
    - title (`h3`)
    - body paragraph(s)
    - optional image (`picture`)
- **Code does:** converts list into interactive timeline UI with controls.
- **Optional config (block metadata):**
  - `defaultYear`: preselect the entry whose year contains this value

### `categories-grid`

- **Author in AEM:**
  - row 1: intro column + optional CTA/action column
  - row 2: list (`ul > li`) cards, each with:
    - link wrapper (`a[href]`)
    - image (`picture`)
    - title (`h3`)
    - CTA text (`.categories-grid__card-cta`)
- **Code does:** applies card sizing/layout classes and download icon treatment.

### `services-grid`

- **Author in AEM:** one list (`ul > li`) where each service item contains title, description, and optional link.
- **Code does:** applies responsive card grid classes and interaction styling.

### `portfolio-gallery`

- **Author in AEM:** one list (`ul > li`) where each item is a link card:
  - `a[href]` wrapper
  - `picture` image
  - title (`h3`)
  - optional subtitle (`p`)
- **Code does:** applies masonry-like premium gallery card treatment with hover zoom/overlay.

### `testimonials-slider`

- **Author in AEM:** each row represents one testimonial entry (quote, body, author, optional role/image).
- **Code does:** builds the slider shell, track, and previous/next controls.

### `pricing-plans`

- **Author in AEM:** one list (`ul > li`) where each plan includes title, price, features, and CTA link.
- **Code does:** formats responsive pricing cards and marks featured plan when text contains `Popular` or `Featured` in a `strong` tag.

### `blog-teasers`

- **Author in AEM:** one list (`ul > li`) of article cards with image, category/date, title, summary, and link.
- **Code does:** applies card layout, image handling, and hover styling.

### `faq-accordion`

- **Author in AEM:** alternating heading (`h3`/`h4`) + body content blocks.
- **Code does:** converts authored heading/body pairs into accessible accordion `details` items.

### `contact-panel`

- **Author in AEM:** one row with two columns (e.g., contact details + form/embed/cta content).
- **Code does:** applies responsive two-column panel and form field styling wrappers.

## Publishing Behavior

- AEM-authored content is served via `fstab.yaml` mountpoint (`/`).
- After author edits and publish, content appears on preview/live URLs.
- Block code changes still follow Git push -> AEM Code Sync workflow.
