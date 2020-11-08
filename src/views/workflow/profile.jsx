import AuthActionCreators from '../../auth/authActionCreators.js';
import AuthSelectors from '../../auth/authSelectors.js';
import Modal from '../common/modal.jsx';
import ProfileForm from './forms/user/profileForm.jsx';
import PropTypes from 'prop-types';
import User from '../../user/user.js';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../styles/modal.css';

const mapStoreToProps = store => {
	return {
		user: AuthSelectors.getUser(store),
		isLoggedIn: AuthSelectors.isLoggedIn(store)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getProfile: () => dispatch(AuthActionCreators.getProfile()),
		logOutUser: () => dispatch(AuthActionCreators.logOutUser())
	}
}

export class Profile extends Component {
	constructor(props){
		super(props);
	}
	
	static get propTypes() {
		return {
			history: PropTypes.object,
			isLoggedIn: PropTypes.bool,
			getProfile: PropTypes.func,
			location: PropTypes.object,
			logOutUser: PropTypes.func,
			user: PropTypes.instanceOf(User)
		}
	}

	componentDidMount() {
		if(this.props.isLoggedIn){
			this.props.getProfile();
		}
	}

	componentDidUpdate(prevProps) {
		if((prevProps.isLoggedIn !== this.props.isLoggedIn) && this.props.isLoggedIn === true) {
			this.props.getProfile();
		}
	}

	_onSave = () => {
		const {history, logOutUser, location} = this.props;
		logOutUser();
		history.push(location.pathname)
	}

	render(){
		const { history, location, user } = this.props;

		const params = new URLSearchParams(location.search);


		const modalProps = {
			title: '',
			show: params.get('profile') ? true : false,
			onHide: () => history.push(location.pathname),
			width: 600
		}
		
		return (
			params.get('profile') &&
			<Modal {...modalProps}>
				<ProfileForm user={user} onSave={this._onSave} />
			</Modal>

		)
	}
}

export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(Profile));