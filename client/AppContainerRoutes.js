/**
 * @file AppContainerRoutes.js
 */

import React, {useMemo} from 'react';

// Vendors
import {createBrowserHistory, createMemoryHistory} from 'history';
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'vivy-router';

// Configs
import configureStore from '../src/config.store';
import configureRoutes from '../src/config.route';

const AppContainerRoutes = () => {

    const history = useMemo(() => {
        return typeof window === 'undefined' ?
            createMemoryHistory()
            :
            createBrowserHistory();
    }, []);

    const store = useMemo(() => {
        return configureStore(history);
    }, [
        history
    ]);

    const routes = useMemo(() => {
        return configureRoutes(store);
    }, [
        store
    ]);

    const content = useMemo(() => {
        return renderRoutes(routes);
    }, [
        routes
    ]);

    console.log('history::', history);
    console.log('store::', store);
    console.log('routes::', routes);
    console.log('content::', content);

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                {content}
            </ConnectedRouter>
        </Provider>
    );

};

export default AppContainerRoutes;
