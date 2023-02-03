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
    <div className="module-b">
        ModuleB
        <div className="module-b-content">
            {renderRoutes(route.routes)}
        </div>
    </div>
);

ModuleB.propTypes = {
    route: PropTypes.object
};

export default connect()(ModuleB);
