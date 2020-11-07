import AuthActionCreators from '../../auth/authActionCreators.js';
import AuthSelectors from '../../auth/authSelectors.js';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import User from '../../user/user.js';
import Modal from '../common/modal.jsx';
import '../../styles/modal.css';
import ProfileForm from './forms/user/profileForm.jsx';

const mapStoreToProps = store => {
	return {
		user: AuthSelectors.getUser(store)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getProfile: () => dispatch(AuthActionCreators.getProfile())
	}
}

class Profile extends Component {
	constructor(props){
		super(props);
	}

	
	static get propTypes() {
		return {
			show: PropTypes.bool,
			getProfile: PropTypes.func,
			onHide: PropTypes.func,
			user: PropTypes.instanceOf(User)
		}
	}

	componentDidMount() {
		this.props.getProfile();
	}

	_onSave = () => {
		localStorage.setItem('auth_token', null);
		this.props.onHide()
	}

	render(){
		const {show, onHide, user} = this.props;
		const modalProps = {
			title: '',
			show,
			onHide,
			width: 600
		}
		
		return (
			<Modal {...modalProps}>
				<ProfileForm user={user} onSave={this._onSave} />
			</Modal>

		)
	}
}

export default connect(mapStoreToProps, mapDispatchToProps)(Profile);