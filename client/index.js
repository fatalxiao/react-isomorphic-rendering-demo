/**
 * @file index.js
 */

import React, {StrictMode} from 'react';
import AppContainer from './AppContainer';
import {hydrateRoot} from 'react-dom/client';

const root = hydrateRoot(document.getElementById('app-container'));
root.render(
    <StrictMode>
        <AppContainer/>
    </StrictMode>
);
