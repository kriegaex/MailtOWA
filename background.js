'use strict';

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({mailtoIntercept: 'on'}, function () {
    console.log("'mailto:' handler extension installed");
  });
});

chrome.runtime.onMessage.addListener(
  function (message, sender, sendResponse) {
    var url = new URL(message.mailtoLink)
    chrome.tabs.query(
      {url: "*://webmail.all-inkl.com/*"},

      function (tabs) {
        var numTabs = tabs.length;
        for (var i = 0; i < numTabs; i++) {
          var tab = tabs[i];
          console.log(tab.url + " -> " + tab.title);
          chrome.windows.update(tab.windowId, {focused: true});
          chrome.tabs.update(tab.id, {selected: true});
          chrome.tabs.executeScript(tab.id, {
            code: `
            document.querySelector("div.item.btn.write").click();
            var newEmailTabIndex = document.querySelectorAll(".mail.item.closeable").length - 1;
            document.querySelectorAll("div.input-to > textarea")[newEmailTabIndex].value = "${url.pathname}";
            document.querySelectorAll("div.input-cc > textarea")[newEmailTabIndex].value = "${url.searchParams.get("cc")}";
            document.querySelectorAll("div.input-bcc > textarea")[newEmailTabIndex].value = "${url.searchParams.get("bcc")}";
            document.querySelectorAll("div.input-subject > input")[newEmailTabIndex].value = "${url.searchParams.get("subject")}";
            var newEmailTextArea = document.querySelectorAll("div.input-body > textarea")[newEmailTabIndex];
            setTimeout(() => { newEmailTextArea.value = "${url.searchParams.get("body").replaceAll(/\r?\n/g, "\\n").replaceAll(/"/g, '\\"')}" + newEmailTextArea.value; }, 500);
          `.replaceAll(/.*"null".*/g, '')
          });
        }
      }
    );
  }
);
