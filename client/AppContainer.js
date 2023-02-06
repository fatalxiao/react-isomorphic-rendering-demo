/**
 * @file AppContainer.js
 */

import React, {lazy, Suspense, useMemo} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

// Components
import HTML from './HTML';

// Vendors
import {createBrowserHistory, createMemoryHistory} from 'history';
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'vivy-router';

// Configs
import configureStore from '../src/config.store';
import configureRoutes from '../src/config.route';

const ROUTES = [{
    path: '/',
    element: (
        <div>/</div>
    )
}, {
    path: '/thinking',
    element: (
        <div>/thinking</div>
    )
}, {
    path: '*',
    element: (
        <div>NotFound</div>
    )
}];

const AppContainer = ({
    children
}) => {
    //
    // const history = useMemo(() => {
    //     return typeof window === 'undefined' ?
    //         createMemoryHistory()
    //         :
    //         createBrowserHistory();
    // }, []);
    //
    // const store = useMemo(() => {
    //     return configureStore(history);
    // }, [
    //     history
    // ]);
    //
    // const routes = useMemo(() => {
    //     return configureRoutes(store);
    // }, [
    //     store
    // ]);
    //
    // const content = useMemo(() => {
    //     return renderRoutes(routes);
    // }, [
    //     routes
    // ]);

    // console.log('history::', history);
    // console.log('store::', store);
    // console.log('routes::', routes);
    // console.log('content::', content);

    if (typeof window === 'undefined') {
        return (
            <HTML>
                <div id="app-container">
                    {ROUTES.map(({path, element}) => (
                        <Route key={path} path={path} element={element}/>
                    ))}
                </div>
            </HTML>
        );
    }

    return (
        <HTML>
            <div id="app-container">
                <BrowserRouter>
                    <Switch>
                        {ROUTES.map(({path, element}) => (
                            <Route key={path} path={path} element={element}/>
                        ))}
                    </Switch>
                </BrowserRouter>
            </div>
        </HTML>
    );

    // return (
    //     <HTML>
    //         <div id="app-container">
    //             {/*<Provider store={store}>*/}
    //             {/*    <ConnectedRouter history={history}>*/}
    //             {content}
    //             {/*    </ConnectedRouter>*/}
    //             {/*</Provider>*/}
    //         </div>
    //     </HTML>
    // );

};

AppContainer.propTypes = {
    children: PropTypes.any
};

export default AppContainer;
