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
		user: AuthSelectors.getUser(store)
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
			getProfile: PropTypes.func,
			logOutUser: PropTypes.func,
			match: PropTypes.object,
			user: PropTypes.instanceOf(User)
		}
	}

	componentDidMount() {
		this.props.getProfile();
	}

	_onSave = () => {
		const {history, logOutUser} = this.props;
		logOutUser();
		history.push('/')
	}

	render(){
		const { match, user, history } = this.props;
		const modalProps = {
			title: '',
			show: match?.params?.show ? true : false,
			onHide: () => history.push('/'),
			width: 600
		}
		
		return (
			<Modal {...modalProps}>
				<ProfileForm user={user} onSave={this._onSave} />
			</Modal>

		)
	}
}

export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(Profile));