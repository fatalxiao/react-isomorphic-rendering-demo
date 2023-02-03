/**
 * @file config.route.js
 */

// Routes config
import configureRootRoutes from 'modules/Root/config.route';
import configureModuleARoutes from 'modules/ModuleA/config.route';
import configureModuleBRoutes from 'modules/ModuleB/config.route';

/**
 * Default Route
 * @type {string}
 */
export const DEFAULT_ROUTE = '/';

/**
 * Configure Routes
 * @param store
 * @returns {[{[p: string]: *}]}
 */
export default function configureRoutes(store) {
    return [{
        ...configureRootRoutes(store),
        routes: [
            configureModuleARoutes,
            configureModuleBRoutes
        ]
    }];
}
