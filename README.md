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
