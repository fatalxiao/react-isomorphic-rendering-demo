/**
 * @file index.js
 */

'use strict';

import React from 'react';

// Vendors
import {createRoot} from 'react-dom/client';
import {createBrowserHistory} from 'history';
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'vivy-router';

// Configs
import configureStore from './config.store';
import configureRoutes from './config.route';

// Styles
import './style.scss';

const history = createBrowserHistory();
const store = configureStore(history);

document.title = 'Demo for react isomorphic rendering';

createRoot(document.getElementById('app-container')).render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            {renderRoutes(configureRoutes(store))}
        </ConnectedRouter>
    </Provider>
);

module?.hot?.accept?.();
