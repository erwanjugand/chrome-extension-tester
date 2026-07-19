console.log('background script loaded')

chrome.power.requestKeepAwake(chrome.power.Level.DISPLAY)

chrome.runtime.onStartup.addListener(() => console.log('onStartup'))
chrome.runtime.onInstalled.addListener(() => console.log('onInstalled'))

chrome.commands.onCommand.addListener((command) => {
  console.log(`Command: ${command}`)
})
