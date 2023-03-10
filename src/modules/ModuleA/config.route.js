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
        path: '/module-a',
        component: AsyncComponent(() => import('./containers/ModuleA'), store, [
            () => import('./models/moduleA')
        ])
    };
}
