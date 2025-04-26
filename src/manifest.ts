import { readJsonFile } from 'vite-plugin-web-extension'

interface Params {
  updateXmlUrl?: string
}

export const defineManifest = ({ updateXmlUrl }: Params): chrome.runtime.ManifestV3 => {
  const pkg = readJsonFile('package.json')

  const permissions: chrome.runtime.ManifestV3['permissions'] = [
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
  ]

  const update_url: chrome.runtime.ManifestV3['update_url'] = updateXmlUrl || undefined

  return {
    manifest_version: 3,
    version: pkg.version,
    kiosk_enabled: true,
    host_permissions: ['<all_urls>'],
    name: 'Chrome extension tester',
    background: {
      service_worker: 'src/background.ts',
      type: 'module',
    },
    externally_connectable: {
      matches: ['https://erwan-jugand.fr/*'],
    },
    content_scripts: [
      {
        js: ['src/contentScript.ts'],
        matches: ['<all_urls>'],
      },
    ],
    update_url,
    permissions,
    file_system_provider_capabilities: {
      source: 'file',
    },
    action: {
      default_title: 'Open popup',
      default_popup: 'src/popup.html',
    },
    icons: {
      '16': 'icon-16.png',
      '48': 'icon-48.png',
    },
    devtools_page: 'src/devtools/index.html',
  }
}
