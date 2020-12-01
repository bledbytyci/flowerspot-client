import AuthActionCreators from '../../auth/authActionCreators.js';
import AuthSelectors from '../../auth/authSelectors.js';
import Modal from '../common/modal.jsx';
import PropTypes from 'prop-types';
import User from '../../user/user.js';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../styles/modal.css';
import validateSignUpForm from './forms/user/signUpFormValidation.js';
import ValidationSummary from '../common/validationSummary.jsx';
import ValidationModel from '../../setup/validationModel.js';
import SignUpForm from './forms/user/signUpForm.jsx';

const mapStoreToProps = store => {
	return {
		user: AuthSelectors.getUser(store),
		isLoggedIn: AuthSelectors.isLoggedIn(store),
		isLoading: AuthSelectors.isLoading(store),
		validationModel: AuthSelectors.getValidationModel(store)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getProfile: () => dispatch(AuthActionCreators.getProfile()),
		logOutUser: () => dispatch(AuthActionCreators.logOutUser()),
		editProfile: user => dispatch(AuthActionCreators.editProfile(user)),
		deleteProfile: id => dispatch(AuthActionCreators.deleteProfile(id))
	}
}

export class Profile extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			user: new User(),
			validationModel: new ValidationModel(),
			showValidationError: false
		}
	}
	
	static get propTypes() {
		return {
			history: PropTypes.object,
			isLoggedIn: PropTypes.bool,
			isLoading: PropTypes.bool,
			getProfile: PropTypes.func,
			editProfile: PropTypes.func,
			deleteProfile: PropTypes.func,
			location: PropTypes.object,
			logOutUser: PropTypes.func,
			user: PropTypes.instanceOf(User),
			validationModel: PropTypes.instanceOf(ValidationModel)
		}
	}

	componentDidMount() {
		if(this.props.isLoggedIn){
			this.props.getProfile();
		}
	}

	componentDidUpdate(prevProps) {
		if(prevProps.isLoading && !this.props.isLoading) {
			this.setState({user: this.props.user})
		}

		if((prevProps.isLoggedIn !== this.props.isLoggedIn) && this.props.isLoggedIn === true) {
			this.props.getProfile();
		}

		if(prevProps.validationModel.isValid !== this.props.validationModel.isValid) {
			this.setState({validationModel: this.props.validationModel, showValidationError: true})
		}
	}

	_onPropertyChange = (user, validationModel) => {
		this.setState({user, validationModel})
	}

	_onLogOut = () => {
		const {history, logOutUser, location} = this.props;
		logOutUser();
		history.push(location.pathname)
	}

	_onDelete = () => {
		const {deleteProfile, user} = this.props;
		deleteProfile(user.id);
		this._onLogOut();
	}

	_onEditProfile = () => {
		const {user} = this.state;
		const { editProfile, history, location } = this.props;
		const validationModel = validateSignUpForm(user, false);
		this.setState({ 
			validationModel,
			showValidationError: !validationModel.isValid
		});
		if(validationModel.isValid) {
			editProfile(user.mapToSignUpApi());
			history.push(location.pathname)
		}
	}

	render(){
		const { history, location } = this.props;
		const { user, showValidationError, validationModel } = this.state
		const params = new URLSearchParams(location.search);


		const modalProps = {
			title: '',
			show: params.get('profile') ? true : false,
			onHide: () => history.push(location.pathname),
			width: 600
		}
		
		const formProps = {
			user,
			onLogout:  this._onLogOut,
			onDelete: this._onDelete,
			onEditProfile: this._onEditProfile,
			onPropertyChange: this._onPropertyChange,
			isEditingProfile: true
		}

		return (
			params.get('profile') &&
			<Modal {...modalProps}>
				<ValidationSummary show={showValidationError && !validationModel.isValid} validationModel={validationModel} />
				<SignUpForm {...formProps} />
			</Modal>

		)
	}
}

export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(Profile));