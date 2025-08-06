import { defineConfig, loadEnv } from 'vite'
import { defineManifest } from './src/manifest'
import webExtension from 'vite-plugin-web-extension'

export default defineConfig(({ mode }) => {
  const modeEnv = loadEnv(mode, process.cwd())
  const updateXmlUrl = modeEnv.VITE_DOMAIN_URL ? `${modeEnv.VITE_DOMAIN_URL}/update.xml` : undefined

  return {
    plugins: [
      webExtension({
        additionalInputs: ['src/devtools/panel.html', 'src/devtools/panel.ts', 'src/devtools/index.ts'],
        disableAutoLaunch: true,
        manifest: () => defineManifest({ updateXmlUrl }),
        watchFilePaths: ['src/manifest.ts'],
      }),
    ],
  }
})
