import { ipcRenderer } from 'electron';

function openMenu(x: number, y: number): void {
  ipcRenderer.send(`display-app-menu`, { x, y });
}

function minimizeWindow(): void {
  ipcRenderer.send(`minimize-app-window`);
}

function maxUnmaxWindow(): void {
  ipcRenderer.send(`max-unmax-app-window`);
}

function sendMaximizeWindowStatus(isMaximized: Boolean): void {
  ipcRenderer.send(`send-maximize-window-status`, { isMaximized });
}

function closeWindow(): void {
  ipcRenderer.send(`close-app-window`);
}

export {
  openMenu,
  minimizeWindow,
  maxUnmaxWindow,
  closeWindow,
  sendMaximizeWindowStatus,
};
