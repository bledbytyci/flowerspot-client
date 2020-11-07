import AuthActionCreators from '../../auth/authActionCreators.js';
import AuthSelectors from '../../auth/authSelectors.js';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../styles/modal.css';
import User from '../../user/user.js';
import ValidationModel from '../../setup/validationModel.js';
import Modal from '../common/modal.jsx';
import ValidationSummary from '../common/validationSummary.jsx';
import validateLogInForm from './forms/user/logInFormValidation.js';
import LogInForm from './forms/user/logInForm.jsx';
import LogInSuccessForm from './forms/user/logInSuccessForm.jsx';

const mapStoreToProps = store => {
	return {
		isLoggedIn: AuthSelectors.isLoggedIn(store),
		validationModel: AuthSelectors.getValidationModel(store)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logInUser: (user) => dispatch(AuthActionCreators.logInUser(user)),
	}
}

class LogIn extends Component {
	constructor(props){
		super(props);

		this.state = {
			user: new User(),
			validationModel: new ValidationModel(),
			showLogInSuccessModal: false,
			showValidationError: false,
		}
	}

	
	static get propTypes() {
		return {
			show: PropTypes.bool,
			logInUser: PropTypes.func,
			onHide: PropTypes.func,
			isLoggedIn: PropTypes.bool,
			validationModel: PropTypes.instanceOf(ValidationModel)
		}
	}

	componentDidUpdate(prevProps) {
		if(prevProps.isLoggedIn && !this.props.isLoggedIn) {
			this.setState({showLogInSuccessModal: true})
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
		const {logInUser} = this.props;
		const validationModel = validateLogInForm(user);
		this.setState({ 
			validationModel,
			showValidationError: !validationModel.isValid,
		});
		if(validationModel.isValid) {
			logInUser(user.mapToLogInApi());
		}
	}

	_onLogInSuccessSave = () => {
		this.setState({showLogInSuccessModal: false})
		this._onHide()
	}

	_onHide = (showProfileModal = false) => {
		this.setState({
			user: new User(),
			validationModel: new ValidationModel()
		}, () => this.props.onHide(showProfileModal))
	}

	_onProfileClick = () => {
		this.setState({showLogInSuccessModal: false})
		this._onHide(true)
	}

	render(){
		const {show} = this.props;
		const {user, validationModel, showLogInSuccessModal, showValidationError} = this.state;

		const modalProps = {
			title: "Welcome Back",
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
				{!showLogInSuccessModal ? (
				<>
					<ValidationSummary show={showValidationError && !validationModel.isValid} validationModel={validationModel} />
					<LogInForm {...formProps} />
				</>
				) : (
					<LogInSuccessForm onSave={this._onLogInSuccessSave} onProfileClick={this._onProfileClick} />
				)}
			</Modal>

		)
	}
}

export default connect(mapStoreToProps, mapDispatchToProps)(LogIn);