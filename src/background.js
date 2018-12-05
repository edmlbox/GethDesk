chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.windows.create({
      // Just use the full URL if you need to open an external page
      url: chrome.runtime.getURL("index.html")
    });
  });