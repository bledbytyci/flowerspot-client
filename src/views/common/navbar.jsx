import AuthActionCreators from '../../auth/authActionCreators';
import AuthSelectors from '../../auth/authSelectors';
import Logo from '../../img/logo.svg';
import PropTypes from 'prop-types';
import profilePicNav from '../../img/menu_profile_holder.png';
import React, {Component} from 'react';
import User from '../../user/user';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../styles/navbar.css';

const mapStoreToProps = store => {
	return {
		isLoggedIn: AuthSelectors.isLoggedIn(store),
		user: AuthSelectors.getUser(store)
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
			checkUserIsLoggedIn: PropTypes.func,
			getProfile: PropTypes.func,
			isLoggedIn: PropTypes.bool,
			location: PropTypes.object,
			user: PropTypes.instanceOf(User)
		}
	}

	componentDidMount() {
		const {checkUserIsLoggedIn} = this.props;
		checkUserIsLoggedIn();
	}

	componentDidUpdate(prevProps) {
		if((prevProps.isLoggedIn !== this.props.isLoggedIn) && this.props.isLoggedIn === true) {
			this.props.getProfile();
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
		const { isLoggedIn, user, location } = this.props;

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
								{isLoggedIn && 
								<Nav.Item>
									<Link to={{pathname: location.pathname, search: '?create=true'}} className="no-underline">
											<span className="navbar-link navbar-login-item">Post new Flower</span>
									</Link>
								</Nav.Item>						
								}
								<Nav.Item>
										<span className="navbar-link">Flowers</span>
								</Nav.Item>
								<Nav.Item>
										<span className="navbar-link">Latest Sightings</span>
								</Nav.Item>
								<Nav.Item>
									<Link to="/favorites" className="no-underline">
										<span className="navbar-link">Favorites</span>
									</Link>
								</Nav.Item>
								{!isLoggedIn ? (
								<>
									<Nav.Item>
											<Link to={{pathname: location.pathname, search: '?login=true'}} className="no-underline">
													<span className="navbar-link navbar-login-item">Log In</span>
											</Link>
									</Nav.Item>
									<Nav.Item>
											<Link to={{pathname: location.pathname, search: '?signup=true'}} className="no-underline">
													<span className="navbar-link navbar-btn">New Account</span>
											</Link>
									</Nav.Item>
								</>
								) : (
								<Nav.Item>
										<Link to={{pathname: location.pathname, search: '?profile=true'}} className="no-underline">
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

export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(NavigationBar));