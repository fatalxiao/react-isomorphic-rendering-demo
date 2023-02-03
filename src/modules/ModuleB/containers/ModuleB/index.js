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

const ModuleB = ({
    route
}) => (
    <ul className="module-b">
        <li>
            ModuleB
        </li>
        {renderRoutes(route.routes)}
    </ul>
);

ModuleB.propTypes = {
    route: PropTypes.object
};

export default connect()(ModuleB);
