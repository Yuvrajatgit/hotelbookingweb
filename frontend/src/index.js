import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Auth0Provider} from '@auth0/auth0-react';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider 
    domain='dev-t0cxvwbcff1dd26v.us.auth0.com'
    clientId='gyzzMyMkpZntUzDIKvmrMK6LecDSodvl'
    authorizationParams={{
        redirect_uri: "https://hotelbookingweb-client.vercel.app"
    }}
    audience="http://localhost:8000"
    scope="opendid profile email">
    <MantineProvider>
    <App />
    </MantineProvider>    
    </Auth0Provider>
);