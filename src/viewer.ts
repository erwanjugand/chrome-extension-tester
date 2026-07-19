console.log('viewer script loaded')

// @ts-expect-error missing namespace
console.log(await chrome.mimeHandler.getStreamInfo())
