import { defineConfig, loadEnv } from 'vite'
import webExtension from 'vite-plugin-web-extension'

import { defineManifest } from './src/manifest'

export default defineConfig(({ mode }) => {
  const modeEnv = loadEnv(mode, process.cwd())
  const updateXmlUrl = modeEnv.VITE_DOMAIN_URL ? `${modeEnv.VITE_DOMAIN_URL}/update.xml` : undefined

  return {
    plugins: [
      webExtension({
        manifest: () => defineManifest({ updateXmlUrl }),
        watchFilePaths: ['src/manifest.ts'],
        disableAutoLaunch: true,
      }),
    ],
  }
})
