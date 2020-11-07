import PropTypes from 'prop-types'
import User from '../../../../user/user';
import validateLogInForm from './logInFormValidation.js'
import { Col, Form, Row } from 'react-bootstrap';
import React, {Component} from 'react';
import '../../../../styles/form.css';

const ATTRIBUTES = {
	EMAIL: 'email',
	PASSWORD: 'password'
}

class LogInForm extends Component {
	static get propTypes() {
		return {
			user: PropTypes.instanceOf(User),
			onPropertyChange: PropTypes.func,
			onSave: PropTypes.func
		}
	}

	_onPropertyChange = (propertyName, propertyValue) => {
		const { user, onPropertyChange } = this.props;
		const newUser = Object.assign(Object.create(Object.getPrototypeOf(user)), user);
		newUser[propertyName] = propertyValue;
		const validationModel = validateLogInForm(newUser)
		onPropertyChange(newUser, validationModel);
	};

	render(){
		const { user, onSave } = this.props;

		return (
			<Form horizontal="true">
				<Row>
					<Col>
					<label className="label">Email Address</label>
						<input
							onChange={e => this._onPropertyChange([ATTRIBUTES.EMAIL], e.target.value)}
							value={user[ATTRIBUTES.EMAIL]}
							className="input"
						/>
					</Col>
				</Row>
				<Row>
					<Col>
					<label className="label">Password</label>
						<input
							onChange={e => this._onPropertyChange([ATTRIBUTES.PASSWORD], e.target.value)}
							value={user[ATTRIBUTES.PASSWORD]}
							className="input"
							type="password"
						/>
					</Col>
				</Row>
				<Row>
					<Col>
					<button className="form-btn signup-btn" 
					onClick={(e) => {
						e.preventDefault()
						onSave()
						}}>Login to your Account</button>
					</Col>
				</Row>
			</Form>
			)
	}
}

export default LogInForm;