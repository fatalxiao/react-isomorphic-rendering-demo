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
    <div className="root">
        Root
        <div className="root-content">
            {renderRoutes(route.routes)}
        </div>
    </div>
);

Root.propTypes = {
    route: PropTypes.object
};

export default connect()(Root);
