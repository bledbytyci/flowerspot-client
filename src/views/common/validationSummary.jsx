import PropTypes from 'prop-types';
import ValidationModel from '../../setup/validationModel.js';
import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import '../../styles/validation.css'

export default class ValidationSummary extends Component {
    static get propTypes() {
        return { 
            show: PropTypes.bool,
            validationModel: PropTypes.instanceOf(ValidationModel)
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