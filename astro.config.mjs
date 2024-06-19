import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://paddyfed.github.io",
  base: "/movies-movies-movies",
  integrations: [svelte()]
});