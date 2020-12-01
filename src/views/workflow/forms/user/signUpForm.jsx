import moment from "moment";
import PropTypes from 'prop-types'
import ReactDatePicker from 'react-datepicker';
import User from '../../../../user/user';
import validateSignUpForm from './signUpFormValidation.js'
import React, {Component} from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import profilePic from '../../../../img/profile-holder.png';
import '../../../../styles/form.css';
import 'react-datepicker/dist/react-datepicker.css';

const ATTRIBUTES = {
	FIRST_NAME: 'first_name',
	LAST_NAME: 'last_name',
	EMAIL: 'email',
	DATE_OF_BIRTH: 'date_of_birth',
	PASSWORD: 'password'
}

class SignUpForm extends Component {
	static get propTypes() {
		return {
			user: PropTypes.instanceOf(User),
			onPropertyChange: PropTypes.func,
			onSave: PropTypes.func,
			onLogout: PropTypes.func,
			onEditProfile: PropTypes.func,
			onDelete: PropTypes.func,
			isEditingProfile: PropTypes.bool
		}
	}

	_onPropertyChange = (propertyName, propertyValue) => {
		const { user, onPropertyChange, isEditingProfile } = this.props;
		const newUser = Object.assign(Object.create(Object.getPrototypeOf(user)), user);
		newUser[propertyName] = propertyValue;
		const validationModel = validateSignUpForm(newUser, !isEditingProfile)
		onPropertyChange(newUser, validationModel);
	};

	render(){
		const { user, onSave, onDelete, onEditProfile, onLogout, isEditingProfile } = this.props;

		return (
			<Form horizontal="true">
				{isEditingProfile && 
				<Row className="profile-header">
					<Col lg={3}>
						<img src={profilePic} width={80} height={80} className="profile-img" />
					</Col>
					<Col className="my-auto">
						<span className="profile-header-tex d-block">{`${user[ATTRIBUTES.FIRST_NAME]} ${user[ATTRIBUTES.LAST_NAME]}`}</span>
						<label className="profile-header-label">47 sightnings</label>
					</Col>
				</Row>
				}
				<Row>
					<Col lg={6}>
					<label className="label">First Name</label>
						<input
							onChange={e => this._onPropertyChange([ATTRIBUTES.FIRST_NAME], e.target.value)}
							value={user[ATTRIBUTES.FIRST_NAME]}
							className="input"
						/>
					</Col>
					<Col lg={6}>
					<label className="label">Last Name</label>
						<input
							onChange={e => this._onPropertyChange([ATTRIBUTES.LAST_NAME], e.target.value)}
							value={user[ATTRIBUTES.LAST_NAME]}
							className="input"
						/>
					</Col>
				</Row>
				<Row>
					<Col>
					<label className="label">Date of Birth</label>
						<ReactDatePicker
							onChange={date => this._onPropertyChange(ATTRIBUTES.DATE_OF_BIRTH, moment(date))}
							selected={user[ATTRIBUTES.DATE_OF_BIRTH]?.toDate()}
							className="input"
						/>
					</Col>
				</Row>
				<Row>
					<Col>
					<label className="label">Email Address</label>
						<input
							onChange={e => this._onPropertyChange([ATTRIBUTES.EMAIL], e.target.value)}
							value={user[ATTRIBUTES.EMAIL]}
							className="input"
							readOnly={isEditingProfile}
						/>
					</Col>
				</Row>
				{!isEditingProfile &&
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
				}
				<Row>
				{!isEditingProfile ? 
					<Col>
						<button className="form-btn signup-btn" 
						onClick={(e) => {
							e.preventDefault()
							onSave()
							}}>Create Account</button>
					</Col>
					:
					<>
					<Col>
						<button className="form-btn signup-btn" 
						onClick={(e) => {
							e.preventDefault()
							onEditProfile()
							}}>Update Account</button>
					</Col>
					<Col>
						<button className="form-btn signup-btn" 
						onClick={(e) => {
							e.preventDefault()
							onDelete()
							}}>Delete Account</button>
					</Col>
					<Col>
						<button className="form-btn signup-btn" 
						onClick={(e) => {
							e.preventDefault()
							onLogout()
							}}>Logout</button>
					</Col>
					</>
				}
				</Row> 
			</Form>
		)
	}
}

export default SignUpForm;