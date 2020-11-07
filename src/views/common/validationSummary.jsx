import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ValidationModel from '../../setup/validationModel.js';
import '../../styles/validation.css'
export default class ValidationSummary extends Component {
    static get propTypes() {
        return { 
            validationModel: PropTypes.instanceOf(ValidationModel),
            show: PropTypes.bool
        };
    }
	
    render() {
        const { validationMessages } = this.props.validationModel;
        
        return (
            this.props.show ?
                <Alert variant="danger">
                    {validationMessages.length === 1 ? (
                        validationMessages.first()
                    ) : (
                        <ul className="validation-list m-0">
                            {' '}
                            {validationMessages.map((validation, key) => (
                                <li key={key}>
                                    {validation}
                                </li>
                            ))}
                        </ul>
                    )}
                </Alert> : null
        );
    }
}