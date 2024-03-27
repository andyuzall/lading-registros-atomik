import React from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Rutas from './routes/Routes'
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId='214259422094-0oq137te95l7mp2gvlh1qq57rq5g4ol1.apps.googleusercontent.com'>
            <Rutas />
        </GoogleOAuthProvider>
    </React.StrictMode>
);