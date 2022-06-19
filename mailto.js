// Initially, cache persistent config data in local storage
chrome.storage.sync.get('mailtoIntercept', (data) => {
  localStorage.setItem('mailtoIntercept', data.mailtoIntercept);
});

// Whenever persistent config data changes, update local storage cache
chrome.storage.onChanged.addListener(
  function (changes, namespace) {
    for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
      if (namespace === 'sync' && key === 'mailtoIntercept') {
        console.log(
          `Storage key "${key}" in namespace "${namespace}" changed.`,
          `Old value was "${oldValue}", new value is "${newValue}".`
        );
        localStorage.setItem('mailtoIntercept', newValue);
      }
    }
  }
);

// Click handler intercepting 'mailto:' links
const clickHandler = (e) => {
  let target = e.target;
  if (
    localStorage.getItem('mailtoIntercept') === 'on' &&
    target.tagName.toLowerCase() === 'a' &&
    target.href.startsWith('mailto:')
  ) {
    chrome.runtime.sendMessage({mailtoLink: target.href});
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
  }
}

document.addEventListener("click", clickHandler, false);
