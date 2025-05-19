import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import { GoogleOAuthProvider } from '@react-oauth/google';

import './index.css'; 
import App from './App.tsx';

const clientId = 'YOUR_GOOGLE_CLIENT_ID'; // Thay bằng real client ID

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter> {/* Bọc ở đây để router hoạt động */}
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
