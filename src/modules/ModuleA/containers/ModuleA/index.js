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
    <ul className="module-a">
        <li>
            ModuleA
        </li>
        {renderRoutes(route.routes)}
    </ul>
);

ModuleA.propTypes = {
    route: PropTypes.object
};

export default connect()(ModuleA);
