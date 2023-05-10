window.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu-btn");
    const minimizeButton = document.getElementById("minimize-btn");
    const maxUnmaxButton = document.getElementById("max-unmax-btn");
    const closeButton = document.getElementById("close-btn");
  
    menuButton.addEventListener("click", e => {
      window.openMenu(e.x, e.y);
    });
  
    minimizeButton.addEventListener("click", e => {
      window.minimizeWindow();
    });

    maxUnmaxButton.addEventListener("click", e => {
      window.maxUnmaxWindow();
    });
  
    closeButton.addEventListener("click", e => {
      window.closeWindow();
    });
  });