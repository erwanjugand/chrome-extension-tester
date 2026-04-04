// oxlint-disable no-magic-numbers
import { readJsonFile } from 'vite-plugin-web-extension'

interface Params {
  version: 2 | 3
  updateXmlUrl?: string
}

const commonPermissions = [
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
  // @ts-expect-error Missing in types
  'input',
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
  // 'offscreen', // For manifest v3
  'pageCapture',
  'platformKeys',
  'power',
  'printerProvider',
  'printing',
  'printingMetrics',
  'privacy',
  // 'processes', // Dev channel
  'proxy',
  // 'readingList', // For manifest v3
  // 'scripting', // For manifest v3
  'search',
  'sessions',
  // 'sidePanel', // For manifest v3
  // 'signedInDevices', // Dev channel
  'storage',
  'system.cpu',
  'system.display',
  'system.memory',
  'system.storage',
  'systemLog',
  'tabCapture',
  // 'tabGroups', // For manifest v3
  'tabs',
  'topSites',
  'tts',
  'ttsEngine',
  'unlimitedStorage',
  // 'userScripts', // For manifest v3
  'vpnProvider',
  'wallpaper',
  // 'webAuthenticationProxy', // For manifest v3
  'webNavigation',
  'webRequest',
  // 'webRequestBlocking', // For manifest v2
  'webRequestAuthProvider',
] as const satisfies chrome.runtime.ManifestV3['permissions']

export const defineManifest = ({ updateXmlUrl, version }: Params): chrome.runtime.Manifest => {
  const pkg = readJsonFile('package.json')
  const update_url: chrome.runtime.Manifest['update_url'] = updateXmlUrl ?? undefined

  const commonManifest = {
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
    default_locale: 'en',
    description: '__MSG_extensionDescription__',
    devtools_page: 'src/devtools/index.html',
    externally_connectable: {
      matches: ['https://erwan-jugand.fr/*'],
    },
    file_browser_handlers: [
      {
        default_title: 'Open with My Extension',
        file_filters: ['filesystem:*.jpg', 'filesystem:*.jpeg', 'filesystem:*.png'],
        id: 'my-file-handler',
      },
    ],
    file_system_provider_capabilities: {
      source: 'file' as const,
    },
    icons: {
      '16': 'icon-16.png',
      '48': 'icon-48.png',
    },
    kiosk_enabled: true,
    name: '__MSG_extensionName__',
    omnibox: {
      keyword: 'aaron',
    },
    update_url,
    version: pkg.version,
  } satisfies Omit<chrome.runtime.Manifest, 'manifest_version'>

  if (version === 2) {
    return {
      ...commonManifest,
      background: {
        scripts: ['src/background.ts'],
      },
      // browser_action: {
      //   default_popup: 'src/popup.html',
      //   default_title: 'Open popup',
      // },
      manifest_version: 2,
      page_action: {
        default_popup: 'src/popup.html',
        default_title: 'Open popup',
      },
      permissions: [...commonPermissions, 'webRequestBlocking', 'declarativeWebRequest'],
    } as const satisfies chrome.runtime.ManifestV2
  }

  // @ts-expect-error Missing in types
  return {
    ...commonManifest,
    action: {
      default_popup: 'src/popup.html',
      default_title: 'Open popup',
    },
    background: {
      service_worker: 'src/background.ts',
      type: 'module',
    },
    host_permissions: ['<all_urls>'],
    manifest_version: 3,
    // @ts-expect-error Missing in types
    permissions: [
      ...commonPermissions,
      'tabGroups',
      'scripting',
      'webAuthenticationProxy',
      'offscreen',
      'sidePanel',
      'readingList',
      'userScripts',
    ],
    side_panel: {
      default_path: 'src/sidePanel.html',
    },
  } as const satisfies chrome.runtime.ManifestV3
}
