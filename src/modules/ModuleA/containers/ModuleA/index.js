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

const ModuleA = ({
    route
}) => (
    <div className="module-a">
        ModuleA
        <div className="module-a-content">
            {renderRoutes(route.routes)}
        </div>
    </div>
);

ModuleA.propTypes = {
    route: PropTypes.object
};

export default connect()(ModuleA);
