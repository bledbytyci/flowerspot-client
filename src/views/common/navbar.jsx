import AuthActionCreators from '../../auth/authActionCreators';
import AuthSelectors from '../../auth/authSelectors';
import React, {Component} from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import Logo from '../../logo.svg';
import PropTypes from 'prop-types';
import profilePicNav from '../../menu_profile_holder.png';
import { connect } from 'react-redux';
import User from '../../user/user';
import '../../styles/navbar.css';
import { Link } from 'react-router-dom';

const mapStoreToProps = store => {
	return {
		user: AuthSelectors.getUser(store),
		isLoggedIn: AuthSelectors.isLoggedIn(store)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		checkUserIsLoggedIn: () => dispatch(AuthActionCreators.checkUserIsLoggedIn()),
		getProfile: () => dispatch(AuthActionCreators.getProfile())
	}
}

class NavigationBar extends Component {
	constructor(props){
		super(props);
	}

	static get propTypes() {
		return {
			user: PropTypes.instanceOf(User),
			checkUserIsLoggedIn: PropTypes.func,
			getProfile: PropTypes.func,
			isLoggedIn: PropTypes.bool
		}
	}

	componentDidMount() {
		const {checkUserIsLoggedIn, getProfile, isLoggedIn} = this.props;
		checkUserIsLoggedIn();
		if(isLoggedIn) {
			getProfile();
		}
	}

	_onSignUpHide = (showLogInModal) => {
		this.setState({
			showSignUpModal: false,
			showLogInModal 
		})
	}

	_onLogInHide = (showProfileModal) => {
		this.setState({
			showLogInModal: false,
			showProfileModal
		})
	}
	
	render(){
		const { isLoggedIn, user } = this.props;
		return (
			<Navbar className="navbar" collapseOnSelect expand="lg">
				<Navbar.Brand>
					<Link to="/">
						<img src={Logo} width="169" height="30" alt=""/>
					</Link>
                </Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ml-auto d-flex align-items-center">
								<Nav.Item>
										<span className="navbar-link">Flowers</span>
								</Nav.Item>
								<Nav.Item>
										<span className="navbar-link">Latest Sightings</span>
								</Nav.Item>
								<Nav.Item>
										<span className="navbar-link">Favorites</span>
								</Nav.Item>
								{!isLoggedIn ? (
								<>
									<Nav.Item>
											<Link to={`/login/${true}`} className="no-underline">
													<span className="navbar-link navbar-login-item">Log In</span>
											</Link>
									</Nav.Item>
									<Nav.Item>
											<Link to={`/signup/${true}`} className="no-underline">
													<span className="navbar-link navbar-btn">New Account</span>
											</Link>
									</Nav.Item>
								</>
								) : (
								<Nav.Item>
										<Link to={`/profile/${true}`} className="no-underline">
											<span className="navbar-link">{`${user.first_name} ${user.last_name}`}</span>
											<img src={profilePicNav} />
										</Link>
								</Nav.Item>
								)}
						</Nav>
					</Navbar.Collapse>
			</Navbar>
		)
	}
}

export default connect(mapStoreToProps, mapDispatchToProps)(NavigationBar);