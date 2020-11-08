import AuthActionCreators from '../../auth/authActionCreators.js';
import AuthSelectors from '../../auth/authSelectors.js';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import User from '../../user/user.js';
import Modal from '../common/modal.jsx';
import '../../styles/modal.css';
import ProfileForm from './forms/user/profileForm.jsx';
import { withRouter } from 'react-router-dom';

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
			logOutUser: PropTypes.func,
			getProfile: PropTypes.func,
			user: PropTypes.instanceOf(User),
			match: PropTypes.object,
			history: PropTypes.object
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