import PropTypes from 'prop-types'
import profilePic from '../../../../img/profile-holder.png';
import User from '../../../../user/user';
import React, {Component} from 'react';
import { Col, Row } from 'react-bootstrap';
import '../../../../styles/form.css';

const ATTRIBUTES = {
	FIRST_NAME: 'first_name',
	LAST_NAME: 'last_name',
	EMAIL: 'email',
	DATE_OF_BIRTH: 'date_of_birth'
}

class ProfileForm extends Component {
	static get propTypes() {
		return {
			user: PropTypes.instanceOf(User),
			onSave: PropTypes.func
		}
	}
	
	render(){
		const { user, onSave } = this.props;

		return (
			<>
				<Row className="profile-header">
					<Col lg={3}>
						<img src={profilePic} width={80} height={80} className="profile-img" />
					</Col>
					<Col className="my-auto">
						<span className="profile-header-tex d-block">{`${user[ATTRIBUTES.FIRST_NAME]} ${user[ATTRIBUTES.LAST_NAME]}`}</span>
						<label className="profile-header-label">47 sightnings</label>
					</Col>
				</Row>
				<Row>
					<Col>
					<label className="profile-label">First Name</label>
					<p className="profile-text">{user[ATTRIBUTES.FIRST_NAME]}</p>
					</Col>
				</Row>
				<Row>
					<Col>
					<label className="profile-label">Last Name</label>
					<p className="profile-text">{user[ATTRIBUTES.LAST_NAME]}</p>
					</Col>
				</Row>
				<Row>
					<Col>
					<label className="profile-label">Date of Birth</label>
					<p className="profile-text">{user[ATTRIBUTES.DATE_OF_BIRTH]?.toDate()}</p>
					</Col>
				</Row>
				<Row>
					<Col>
					<label className="profile-label">Email Address</label>
					<p className="profile-text">{user[ATTRIBUTES.EMAIL]}</p>
					</Col>
				</Row>
				<Row className="justify-content-center">
					<Col className="text-center">
					<button className="form-btn logout-btn" 
					onClick={(e) => {
						e.preventDefault()
						onSave()
						}}>Logout</button>
					</Col>
				</Row>
			</>
		)
	}
}

export default ProfileForm;