// oxlint-disable no-magic-numbers
import { defineConfig, loadEnv } from 'vite'
import { defineManifest } from './src/manifest'
import webExtension from 'vite-plugin-web-extension'

export default defineConfig(({ mode }) => {
  const modeEnv = loadEnv(mode, process.cwd())
  const updateXmlUrl = modeEnv.VITE_DOMAIN_URL ? `${modeEnv.VITE_DOMAIN_URL}/update.xml` : undefined
  const version = +modeEnv.VITE_MANIFEST_VERSION === 2 ? 2 : 3
  const outDir = modeEnv.VITE_OUT_DIR

  return {
    build: {
      outDir,
    },
    plugins: [
      webExtension({
        additionalInputs: ['src/devtools/panel.html', 'src/devtools/panel.ts', 'src/devtools/index.ts'],
        disableAutoLaunch: true,
        manifest: () => defineManifest({ updateXmlUrl, version }),
        watchFilePaths: ['src/manifest.ts'],
      }),
    ],
  }
})
