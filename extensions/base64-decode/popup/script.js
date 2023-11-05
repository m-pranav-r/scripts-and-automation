'use strict';
/*
function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

browser.contextMenus.create(
  {
    id: "decode-selection",
    title: "Decode with Base64",
    contexts: ["selection"]
  }, onCreated
);

browser.contextMenus.onClicked.addListener((info, tab) => {
  console.log("Menu event generated.");
  switch(info.menuItemId) {
    case "decode-selection":
  }
});
*/
function DecodeTextFromClipboard() {
  console.log("Button click triggered.")
  let decodedText;
  navigator.clipboard
    .readText()
    .then(
      (clipText) => (decodedText = atob(clipText))
    );
  document.querySelector('decoded > p').innerHTML = decodedText;
  console.log(decodedText);
}
