import { writeFile } from 'node:fs/promises';

// Server bundles must never be downloadable through the static asset binding.
await writeFile('dist/.assetsignore', '_worker.js\n_routes.json\n');
