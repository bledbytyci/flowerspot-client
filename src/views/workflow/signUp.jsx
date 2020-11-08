import AuthActionCreators from '../../auth/authActionCreators.js';
import AuthSelectors from '../../auth/authSelectors.js';
import Modal from '../common/modal.jsx';
import PropTypes from 'prop-types';
import SignUpForm from './forms/user/signUpForm.jsx';
import SignUpSuccessForm from './forms/user/signUpSuccessForm.jsx';
import User from '../../user/user.js';
import validateSignUpForm from './forms/user/signUpFormValidation.js';
import ValidationModel from '../../setup/validationModel.js';
import ValidationSummary from '../common/validationSummary.jsx';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../styles/modal.css';

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

export class SignUp extends Component {
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
			isCreating: PropTypes.bool,
			history: PropTypes.object,
			match: PropTypes.object,
			signUpUser: PropTypes.func,
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
		const { history } = this.props;
		this.setState({showLogInSuccessModal: false}, () => history.push(`/login/${true}`));
	}

	render(){
		const { match, history} = this.props;
		const {user, validationModel, showSignUpSuccessModal, showValidationError} = this.state;

		const modalProps = {
			title: "Create an Account",
			show: match?.params?.show ? true : false,
			onHide: () => history.push('/')
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

export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(SignUp));