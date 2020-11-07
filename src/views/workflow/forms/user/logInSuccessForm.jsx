import PropTypes from 'prop-types'
import { Col, Row } from 'react-bootstrap';
import React, {Component} from 'react';
import '../../../../styles/form.css';


class LogInSuccessForm extends Component {
	static get propTypes() {
		return {
			onSave: PropTypes.func,
			onProfileClick: PropTypes.func
		}
	}

	render(){
		const { onSave, onProfileClick } = this.props;

		return (
			<>
				<Row>
					<Col>
					<p className="sign-up-success-text">Congratulations! You have successfully logged into FlowrSpot!</p>
					</Col>
				</Row>
				<Row>
					<Col>
					<button className="form-btn signup-btn" 
					onClick={(e) => {
						e.preventDefault()
						onSave()
						}}>OK</button>
					</Col>
					<Col>
					<button className="form-btn signup-btn" 
					onClick={(e) => {
						e.preventDefault()
						onProfileClick()
						}}>PROFILE</button>
					</Col>
				</Row>
			</>
			)
	}
}

export default LogInSuccessForm;