export const defineManifest = (): chrome.runtime.ManifestV3 => {
  type AllManifestPermissions = chrome.runtime.ManifestPermissions[]

  const permissions: AllManifestPermissions = [
    // @ts-expect-error Missing declaration in types
    'accessibilityFeatures.modify',
    // @ts-expect-error Missing declaration in types
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
    // @ts-expect-error Missing declaration in types
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
    // @ts-expect-error Missing declaration in types
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
    // @ts-expect-error Missing declaration in types
    'webAuthenticationProxy',
    'webNavigation',
    'webRequest',
    // 'webRequestBlocking', // For manifest v2
    'webRequestAuthProvider',
  ]

  return {
    manifest_version: 3,
    version: '1.0.0',
    name: 'Chrome extension tester',
    background: {
      service_worker: 'src/background.ts',
      type: 'module',
    },
    permissions,
  }
}
