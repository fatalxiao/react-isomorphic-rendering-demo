/**
 * @file AppContainerRoutes.js
 */

import React from 'react';

// Vendors
import {createBrowserHistory} from 'history';
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'vivy-router';

// Configs
import configureStore from '../src/config.store';
import configureRoutes from '../src/config.route';

const AppContainerRoutes = () => {

    if (typeof window === 'undefined') {
        const store = configureStore();
        return (
            <Provider store={store}>
                {renderRoutes(configureRoutes(store))}
            </Provider>
        );
    }

    const history = createBrowserHistory();
    const store = configureStore(history);
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                {renderRoutes(configureRoutes(store))}
            </ConnectedRouter>
        </Provider>
    );

};

export default AppContainerRoutes;
