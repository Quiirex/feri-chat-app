// menu-functions.js
const { ipcRenderer } = require("electron");

function getCurrentWindow() {
  return remote.getCurrentWindow();
}

function openMenu(x, y) {
  ipcRenderer.send(`display-app-menu`, { x, y });
}

function minimizeWindow() {
  ipcRenderer.send(`minimize-app-window`);
}

function maxUnmaxWindow() {
  ipcRenderer.send(`max-unmax-app-window`);
}

function closeWindow() {
  ipcRenderer.send(`close-app-window`);
}

function isWindowMaximized(browserWindow = getCurrentWindow()) {
  return browserWindow.isMaximized();
}

module.exports = {
  getCurrentWindow,
  openMenu,
  minimizeWindow,
  maxUnmaxWindow,
  isWindowMaximized,
  closeWindow,
};