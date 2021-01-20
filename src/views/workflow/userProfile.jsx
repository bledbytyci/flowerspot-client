import AuthActionCreators from '../../auth/authActionCreators.js';
import AuthSelectors from '../../auth/authSelectors.js';
import Modal from '../common/modal.jsx';
import PropTypes from 'prop-types';
import User from '../../user/user.js';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../styles/modal.css';
import UserForm from './forms/user/userForm.jsx';

const mapStoreToProps = store => {
	return {
		user: AuthSelectors.geetUserProfile(store),
		isLoggedIn: AuthSelectors.isLoggedIn(store),
		isLoading: AuthSelectors.isLoadingUserProfile(store),
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getProfileById: id => dispatch(AuthActionCreators.getProfileById(id))
	}
}

export class UserProfile extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			user: new User()
		}
	}
	
	static get propTypes() {
		return {
			history: PropTypes.object,
			isLoggedIn: PropTypes.bool,
			isLoading: PropTypes.bool,
			getProfileById: PropTypes.func,
			location: PropTypes.object,
			user: PropTypes.instanceOf(User)
		}
	}

	componentDidMount() {
		const {getProfileById, location } = this.props;
		console.log(location.search.substring(21, 57))
		getProfileById(location.search.substring(21, 57));
	}

	componentDidUpdate(prevProps) {
		if(prevProps.isLoading && !this.props.isLoading) {
			this.setState({user: this.props.user})
		}
	}

	render(){
		const { history, location } = this.props;
		const { user } = this.state
		const params = new URLSearchParams(location.search);

		const modalProps = {
			title: '',
			show: params.get('userprofile') ? true : false,
			onHide: () => history.push(location.pathname),
			width: 600
		}
		
		const formProps = {
			user,
			includeButtons: false
		}

		return (
			params.get('userprofile') &&
			<Modal {...modalProps}>
				<UserForm {...formProps} />
			</Modal>

		)
	}
}

export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(UserProfile));