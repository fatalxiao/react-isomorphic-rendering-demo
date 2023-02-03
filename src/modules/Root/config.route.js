/**
 * @file config.route.js
 */

// Components
import {AsyncComponent} from 'vivy-async-component';

/**
 * Configure Routes
 * @param store
 * @returns {*}
 */
export default function configureRoutes(store) {
    return {
        path: '/',
        component: AsyncComponent(() => import('./containers/Root'), store, [
            () => import('./models/root')
        ])
    };
}
