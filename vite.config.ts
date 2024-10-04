import { defineConfig } from 'vite'
import webExtension from 'vite-plugin-web-extension'

import { defineManifest } from './src/manifest'

export default defineConfig(() => {
  return {
    plugins: [
      webExtension({
        manifest: () => defineManifest(),
        watchFilePaths: ['src/manifest.ts'],
        disableAutoLaunch: true,
      }),
    ],
  }
})
