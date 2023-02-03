/**
 * @file AppContainer.js
 */

import React from 'react';
import PropTypes from 'prop-types';

// Components
import AppContainerRoutes from './AppContainerRoutes';

const AppContainer = ({
    children
}) => (
    <html lang="en">
        <head>

            <title></title>

            <meta name="viewport"
                  content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
            <meta name="format-detection"
                  content="telephone=no"/>

            {/* <link rel="stylesheet"*/}
            {/*      href={compile('./src/assets/scss/index.scss').css}/>*/}

        </head>
        <body>
            <div id="app-container">
                <AppContainerRoutes/>
            </div>
        </body>
    </html>
);

AppContainer.propTypes = {
    children: PropTypes.any
};

export default AppContainer;
