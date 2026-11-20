import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { textes } from './src/textes.js';

const langue = process.env.VITE_LANGUE || 'fr';
const t = textes[langue];

export default defineConfig({
  plugins: [
    svelte(),
    viteSingleFile(),
    {
      name: 'langue-html',
      transformIndexHtml: (html) =>
        html.replace('%LANG%', langue).replace('%TITRE%', t.titre)
    }
  ],
  build: { outDir: `dist-${langue}`, emptyOutDir: true }
});
