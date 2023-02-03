/**
 * @file index.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Vendors
import {renderRoutes} from 'react-router-config';

// Styles
import './style.scss';

const Root = ({
    route
}) => (
    <ul className="root">
        <li>
            Root
        </li>
        {renderRoutes(route.routes)}
    </ul>
);

Root.propTypes = {
    route: PropTypes.object
};

export default connect()(Root);
