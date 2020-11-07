import AuthActionCreators from '../../auth/authActionCreators.js';
import AuthSelectors from '../../auth/authSelectors.js';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../styles/modal.css';
import User from '../../user/user.js';
import ValidationModel from '../../setup/validationModel.js';
import Modal from '../common/modal.jsx';
import SignUpForm from './forms/user/signUpForm.jsx';
import ValidationSummary from '../common/validationSummary.jsx';
import validateSignUpForm from './forms/user/signUpFormValidation.js';
import SignUpSuccessForm from './forms/user/signUpSuccessForm.jsx';

const mapStoreToProps = store => {
	return {
		isCreating: AuthSelectors.isCreating(store),
		validationModel: AuthSelectors.getValidationModel(store)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		signUpUser: (user) => dispatch(AuthActionCreators.signUpUser(user))
	}
}

class SignUp extends Component {
	constructor(props){
		super(props);

		this.state = {
			user: new User(),
			validationModel: new ValidationModel(),
			showSignUpSuccessModal: false,
			showValidationError: false
		}
	}

	
	static get propTypes() {
		return {
			show: PropTypes.bool,
			signUpUser: PropTypes.func,
			onHide: PropTypes.func,
			isCreating: PropTypes.bool,
			validationModel: PropTypes.instanceOf(ValidationModel)
		}
	}

	componentDidUpdate(prevProps) {
		if(prevProps.isCreating && !this.props.isCreating) {
			this.setState({showSignUpSuccessModal: true})
		}

		if(prevProps.validationModel.isValid !== this.props.validationModel.isValid) {
			this.setState({validationModel: this.props.validationModel})
		}
	}

	_onPropertyChange = (user, validationModel) => {
		this.setState({user, validationModel})
	}

	_onSave = () => {
		const {user} = this.state;
		const {signUpUser} = this.props;
		const validationModel = validateSignUpForm(user);
		this.setState({ 
			validationModel,
			showValidationError: !validationModel.isValid
		});
		if(validationModel.isValid) {
			signUpUser(user.mapToSignUpApi());
		}
	}

	_onSignUpSuccessSave = () => {
		this.setState({showSignUpSuccessModal: false})
		this._onHide(true)
	}

	_onHide = (showLogIn = false) => {
		this.setState({
			user: new User(),
			validationModel: new ValidationModel()
		}, () => this.props.onHide(showLogIn))
	}

	render(){
		const {show} = this.props;
		const {user, validationModel, showSignUpSuccessModal, showValidationError} = this.state;

		const modalProps = {
			title: "Create an Account",
			show,
			onHide: () => this._onHide()
		}
		
		const formProps = {
			user,
			onPropertyChange: this._onPropertyChange,
			onSave: this._onSave
		}

		return (
			<Modal {...modalProps}>
				{!showSignUpSuccessModal ? (
				<>
					<ValidationSummary show={showValidationError && !validationModel.isValid} validationModel={validationModel} />
					<SignUpForm {...formProps} />
				</>
				) : (
					<SignUpSuccessForm onSave={this._onSignUpSuccessSave} />
				)}
			</Modal>

		)
	}
}

export default connect(mapStoreToProps, mapDispatchToProps)(SignUp);