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
import { withRouter } from 'react-router-dom';

const mapStoreToProps = store => {
	return {
		isLoggedIn: AuthSelectors.isLoggedIn(store),
		validationModel: AuthSelectors.getValidationModel(store)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logInUser: (user) => dispatch(AuthActionCreators.logInUser(user))
	}
}

export class LogIn extends Component {
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
			logInUser: PropTypes.func,
			isLoggedIn: PropTypes.bool,
			validationModel: PropTypes.instanceOf(ValidationModel),
			match: PropTypes.object,
			history: PropTypes.object
		}
	}

	componentDidUpdate(prevProps) {
		if(prevProps.isLoggedIn !== this.props.isLoggedIn) {
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
		const { history } = this.props;
		this.setState({showLogInSuccessModal: false}, () => history.push('/'));
	}

	_onProfileClick = () => {
		const { history } = this.props;
		this.setState({showLogInSuccessModal: false}, () => history.push(`/profile/${true}`));
	}

	render(){
		const { match, history } = this.props;
		const { user, validationModel, showLogInSuccessModal, showValidationError } = this.state;

		const modalProps = {
			title: "Welcome Back",
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

export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(LogIn));