/**
 * @file config.store.js
 */

// Vivy
import Vivy from 'vivy';
import VivyRouter from 'vivy-router';
import VivyAsyncComponent from 'vivy-async-component';
import VivyApi from 'vivy-api';
import VivySubscription from 'vivy-subscription';
import VivyI18n from 'vivy-i18n';

// Middlewares
import thunk from 'redux-thunk';

// Vendors
import axios from 'axios';

/**
 * Vivy store
 * @param history
 * @returns {*|{}}
 */
export default function configureStore(history) {

    const vivy = Vivy({
        extraMiddlewares: [
            thunk
        ]
    });

    vivy.use(VivyRouter({
        history
    }));

    vivy.use(VivyAsyncComponent());

    vivy.use(VivyApi({
        checkResponseStatus: response => response?.status === 200 && response?.data?.result === 'success',
        successResponseHandler: () => next => action => {

            const {
                response: xhr,
                successCallback
            } = action;

            const response = xhr?.data;
            const responseData = xhr?.data?.body;

            next({
                ...action,
                xhr,
                response,
                responseData
            });

            successCallback?.(responseData, response, xhr);

        },
        failureResponseHandler: () => next => action => {

            const {
                response: xhr,
                failureCallback,
                error
            } = action;

            if (axios.isCancel(error)) {
                return;
            }

            const response = xhr?.data;
            const responseData = xhr?.data?.body;
            const responseError = xhr?.data?.error;

            next({
                ...action,
                xhr,
                response,
                responseData,
                responseError,
                error: responseError?.msg
            });

            failureCallback?.(responseError, response, xhr);

        }

    }));

    vivy.use(VivySubscription());

    vivy.use(VivyI18n());

    return vivy.createStore();

}
