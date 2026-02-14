
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const Root: React.FC = () => {
  // Simple hack to allow components to navigate without a context/router library
  const [view, setView] = React.useState('home');
  (window as any)._setView = setView;
  
  return <App />;
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
