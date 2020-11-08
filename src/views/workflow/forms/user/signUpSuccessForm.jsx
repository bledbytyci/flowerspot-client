import PropTypes from 'prop-types'
import React, {Component} from 'react';
import { Col, Row } from 'react-bootstrap';
import '../../../../styles/form.css';

class SignUpSuccessForm extends Component {
	static get propTypes() {
		return {
			onSave: PropTypes.func
		}
	}

	render(){
		const { onSave } = this.props;

		return (
			<>
				<Row>
					<Col>
					<p className="sign-up-success-text">Congratulations! You have successfully signed up for FlowrSpot!</p>
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
				</Row>
			</>
		)
	}
}

export default SignUpSuccessForm;