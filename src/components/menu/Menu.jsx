import React, { useEffect, useRef, useState } from 'react';
import './Menu.scss';

const Menu = () => {
  const menuButtonRef = useRef(null);
  const minimizeButtonRef = useRef(null);
  const maxUnmaxButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const menuButton = menuButtonRef.current;
    const minimizeButton = minimizeButtonRef.current;
    const closeButton = closeButtonRef.current;

    menuButton.addEventListener('click', (e) => {
      window.openMenu(e.x, e.y);
    });

    minimizeButton.addEventListener('click', (e) => {
      window.minimizeWindow();
    });

    closeButton.addEventListener('click', (e) => {
      window.closeWindow();
    });

    // Cleanup function to remove event listeners
    return () => {
      menuButton.removeEventListener('click', (e) => {
        window.openMenu(e.x, e.y);
      });

      minimizeButton.removeEventListener('click', (e) => {
        window.minimizeWindow();
      });

      closeButton.removeEventListener('click', (e) => {
        window.closeWindow();
      });
    };
  }, []);

  useEffect(() => {
    const maxUnmaxButton = maxUnmaxButtonRef.current;

    maxUnmaxButton.addEventListener('click', (e) => {
      window.sendMaximizeWindowStatus(isMaximized);
    });

    if (isMaximized) {
      maxUnmaxButton.innerHTML = '<i class="far fa-window-restore"></i>';
    } else {
      maxUnmaxButton.innerHTML = '<i class="far fa-square"></i>';
    }

    return () => {
      maxUnmaxButton.removeEventListener('click', (e) => {
        window.sendMaximizeWindowStatus(isMaximized);
      });
    };
  }, [isMaximized]);

  const maximizeWindow = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <div id="menu-bar">
      <div className="left" role="menu">
        <button ref={menuButtonRef} className="menubar-btn" id="menu-btn">
          <i className="fas fa-bars"></i>
        </button>
        <h5>Feri Chat App</h5>
      </div>
      <div className="right">
        <button
          ref={minimizeButtonRef}
          className="menubar-btn"
          id="minimize-btn"
        >
          <i className="fas fa-window-minimize"></i>
        </button>
        <button
          ref={maxUnmaxButtonRef}
          onClick={maximizeWindow}
          className="menubar-btn"
          id="max-unmax-btn"
        >
          <i className="far fa-square"></i>
        </button>
        <button ref={closeButtonRef} className="menubar-btn" id="close-btn">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export { Menu };
