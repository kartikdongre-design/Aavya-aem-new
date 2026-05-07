# Your Project's Title...
Your project's description...

## Environments
- Preview: https://main--{repo}--{owner}.aem.page/
- Live: https://main--{repo}--{owner}.aem.live/

## Documentation

Before using the aem-boilerplate, we recommand you to go through the documentation on https://www.aem.live/docs/ and more specifically:
1. [Developer Tutorial](https://www.aem.live/developer/tutorial)
2. [The Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project)
3. [Web Performance](https://www.aem.live/developer/keeping-it-100)
4. [Markup, Sections, Blocks, and Auto Blocking](https://www.aem.live/developer/markup-sections-blocks)

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Local development

1. Create a new repository based on the `aem-boilerplate` template
1. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
1. Install dependencies: `npm i`
1. **Start the dev server** (serves the corporate home from **`index.html` at the repo root**):
   ```sh
   npm start
   ```
   Or run plain `aem up` — the CLI uses `--html-folder .` so `http://localhost:3000/` loads that file even when the remote preview has no `index.md` yet.

   Optional: open `http://localhost:3000/drafts/` to hit the redirect stub (same as `/`).

1. Optional global CLI: `npm install -g @adobe/aem-cli` then you can run the same flags manually.
1. Open the `{repo}` directory in your favorite IDE and start coding :)

## Live Preview Sync Workflow

Use this flow to reflect local code changes on AEM preview URLs for all page sections and blocks.

1. Run local development with auto-reload:
   ```sh
   npm start
   ```
2. Validate code and block mapping (excluding header/footer managed separately):
   ```sh
   npm run prepush:check
   ```
3. Push your branch to GitHub:
   ```sh
   git push -u origin <branch>
   ```
4. Open the feature preview URL printed by:
   ```sh
   npm run preview:urls
   ```
5. If updates seem stale, reload with cache-busting query string:
   - `https://{branch}--{repo}--{owner}.aem.page/?v=<timestamp>`

### Notes
- AEM Code Sync publishes code changes from GitHub branches automatically to `.aem.page`.
- `npm run verify:blocks` checks that local blocks referenced by `index.html` have corresponding local `blocks/{name}/{name}.js` and `blocks/{name}/{name}.css`.
- Header/footer can remain managed independently via their block implementations.

## Two-Way Sync Model (Code + Content)

This project uses a code-driven root page (`/`) from repository files and mounts AEM DA content under `/content` in `fstab.yaml`.

- **Code path (Local -> Git -> AEM Preview/Live for layout and block behavior)**
  1. Edit JS/CSS/block files locally.
  2. Run `npm run prepush:check`.
  3. Push your branch.
  4. Validate on feature preview (`.aem.page`) from `npm run preview:urls`.

- **Content path (AEM Author -> Preview/Live -> Local snapshot for dynamic fields)**
  1. Update page content in AEM/DA under `/content/...`.
  2. Publish/preview content in AEM.
  3. Pull latest rendered content snapshot into repo:
     - `npm run content:pull:preview` (pulls `/content/index` from branch preview)
     - `npm run content:pull:live` (pulls `/content/index` from main live)
  4. Compare snapshots under `synced-content/` with expected authored output.

- **Placeholder guard**
  - `npm run content:verify:no-placeholder` fails if default boilerplate text (`Congrats, Welcome to kartikdongre`) is detected on preview home.

This keeps structure/design in code while allowing AEM-managed content updates without modifying block implementation files.

## AEM-Editable Block Contracts

For field-level mapping between authored AEM content and frontend block rendering, see:

- `docs/block-authoring-model.md`

For code-driven pages using AEM-managed dynamic content, author reusable content entries under `/content` and reference them from page blocks (for example via fragment/content links) so that:

- block structure and behavior remain in repository code
- editable text/images/links remain in AEM
