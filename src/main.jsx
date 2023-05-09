import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import './samples/node-api';
import './index.scss';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ChatContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>
);

postMessage({ payload: 'removeLoading' }, '*');
