import { readJsonFile } from 'vite-plugin-web-extension'

interface Params {
  updateXmlUrl?: string
}

const permissions = [
  'accessibilityFeatures.modify',
  'accessibilityFeatures.read',
  'activeTab',
  'alarms',
  'audio',
  'background',
  'bookmarks',
  'browsingData',
  'certificateProvider',
  'clipboardRead',
  'clipboardWrite',
  'contentSettings',
  'contextMenus',
  'cookies',
  'debugger',
  'declarativeContent',
  'declarativeNetRequest',
  'declarativeNetRequestFeedback',
  'declarativeNetRequestWithHostAccess',
  // 'declarativeWebRequest', // Canal Beta
  // 'dns', // Dev channel
  'desktopCapture',
  'documentScan',
  'downloads',
  'downloads.open',
  'downloads.shelf',
  'downloads.ui',
  'enterprise.deviceAttributes',
  'enterprise.hardwarePlatform',
  'enterprise.networkingAttributes',
  'enterprise.platformKeys',
  'enterprise.login',
  // 'experimental', // requires the 'experimental-extension-apis' command line switch to be enabled.
  'favicon',
  'fileBrowserHandler',
  'fileSystemProvider',
  'fontSettings',
  'gcm',
  'geolocation',
  'history',
  'identity',
  'identity.email',
  'idle',
  'loginState',
  'management',
  'nativeMessaging',
  'notifications',
  'offscreen',
  'pageCapture',
  'platformKeys',
  'power',
  'printerProvider',
  'printing',
  'printingMetrics',
  'privacy',
  // 'processes', // Dev channel
  'proxy',
  'readingList',
  'scripting',
  'search',
  'sessions',
  'sidePanel',
  // 'signedInDevices', // Dev channel
  'storage',
  'system.cpu',
  'system.display',
  'system.memory',
  'system.storage',
  'systemLog',
  'tabCapture',
  'tabGroups',
  'tabs',
  'topSites',
  'tts',
  'ttsEngine',
  'unlimitedStorage',
  'userScripts',
  'vpnProvider',
  'wallpaper',
  'webAuthenticationProxy',
  'webNavigation',
  'webRequest',
  // 'webRequestBlocking', // For manifest v2
  'webRequestAuthProvider',
] as const satisfies chrome.runtime.ManifestV3['permissions']

export const defineManifest = ({ updateXmlUrl }: Params): chrome.runtime.ManifestV3 => {
  const pkg = readJsonFile('package.json')
  const update_url: chrome.runtime.ManifestV3['update_url'] = updateXmlUrl ?? undefined

  return {
    action: {
      default_popup: 'src/popup.html',
      default_title: 'Open popup',
    },
    background: {
      service_worker: 'src/background.ts',
      type: 'module',
    },
    commands: {
      test: {
        description: 'Just a test',
        suggested_key: {
          default: 'Ctrl+M',
        },
      },
    },
    content_scripts: [
      {
        js: ['src/contentScript.ts'],
        matches: ['<all_urls>'],
      },
    ],
    devtools_page: 'src/devtools/index.html',
    externally_connectable: {
      matches: ['https://erwan-jugand.fr/*'],
    },
    file_system_provider_capabilities: {
      source: 'file',
    },
    host_permissions: ['<all_urls>'],
    icons: {
      '16': 'icon-16.png',
      '48': 'icon-48.png',
    },
    kiosk_enabled: true,
    manifest_version: 3,
    name: 'Chrome extension tester',
    permissions,
    update_url,
    version: pkg.version,
  }
}
