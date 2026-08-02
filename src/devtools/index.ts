console.log('devtools script loaded')

chrome.devtools.panels.create('Chrome extension tester', 'icon-48.png', 'src/devtools/panel.html', (panel) => {
  console.log('panel created', panel)
})
