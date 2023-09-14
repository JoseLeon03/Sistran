// const { remote } = require("electron");
// const {
//   getCurrentWindow,
//   openMenu,
//   minimizeWindow,
//   unmaximizeWindow,
//   maxUnmaxWindow,
//   isWindowMaximized,
//   closeWindow,
// } = require("./menu-functions");

// window.addEventListener("DOMContentLoaded", () => {
//   window.getCurrentWindow = getCurrentWindow;
//   window.openMenu = openMenu;
//   window.minimizeWindow = minimizeWindow;
//   window.unmaximizeWindow = unmaximizeWindow;
//   window.maxUnmaxWindow = maxUnmaxWindow;
//   window.isWindowMaximized = isWindowMaximized;
//   window.closeWindow = closeWindow;
// });

const path = require('path');
const url = require('url');

const customTitlebar = require('custom-electron-titlebar');

window.addEventListener('DOMContentLoaded', () => {
  new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#2f3241'),
    icon: url.format(path.join(__dirname, '/images', '/icon.png')),
  });

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
