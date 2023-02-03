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
        path: '/module-b',
        component: AsyncComponent(() => import('./containers/ModuleB'), store, [
            () => import('./models/moduleB')
        ])
    };
}
