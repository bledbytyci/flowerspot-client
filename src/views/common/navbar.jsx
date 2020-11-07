import AuthActionCreators from '../../auth/authActionCreators';
import AuthSelectors from '../../auth/authSelectors';
import React, {Component} from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import Logo from '../../logo.svg';
import LogIn from '../workflow/logIn.jsx';
import Profile from '../workflow/profile.jsx';
import PropTypes from 'prop-types';
import SignUp from '../workflow/signUp.jsx';
import profilePicNav from '../../menu_profile_holder.png';
import { connect } from 'react-redux';
import User from '../../user/user';
import '../../styles/navbar.css';

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

		this.state = {
			showSignUpModal: false,
			showLogInModal: false,
			showProfileModal: false
		}
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
		const {checkUserIsLoggedIn, getProfile} = this.props;
		checkUserIsLoggedIn()
		getProfile()
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
		const { showSignUpModal, showLogInModal, showProfileModal } = this.state;
		const { isLoggedIn, user } = this.props;
		return (
			<>
			<Navbar className="navbar" collapseOnSelect expand="lg">
				<Navbar.Brand href="#/">
				<img src={Logo} width="169" height="30" alt=""/>
                </Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ml-auto d-flex align-items-center">
								<Nav.Item>
										<Nav.Link href="#">
											<span className="navbar-link">Flowers</span>
										</Nav.Link>
								</Nav.Item>
								<Nav.Item>
										<Nav.Link href="#">
											<span className="navbar-link">Latest Sightings</span>
										</Nav.Link>
								</Nav.Item>
								<Nav.Item >
										<Nav.Link href="#">
											<span className="navbar-link">Favorites</span>
										</Nav.Link>
								</Nav.Item>
								{!isLoggedIn ? (
								<>
									<Nav.Item >
											<Nav.Link href="#"
											onClick={() => this.setState({showLogInModal: true})}>
												<span className="navbar-link navbar-login-item">Log In</span>
											</Nav.Link>
									</Nav.Item>
									<Nav.Item>
											<Nav.Link href="#"  
												onClick={() => this.setState({showSignUpModal: true})}>
													<span className="navbar-link navbar-btn">New Account</span>
											</Nav.Link>
									</Nav.Item>
								</>
								) : (
								<Nav.Item>
										<Nav.Link href="#" onClick={() => this.setState({showProfileModal: true})}>
											<span className="navbar-link">{`${user.first_name} ${user.last_name}`}</span>
											<img src={profilePicNav} />
											</Nav.Link>
								</Nav.Item>
								)}
						</Nav>
					</Navbar.Collapse>
			</Navbar>
			{showSignUpModal && <SignUp show={showSignUpModal} onHide={this._onSignUpHide} />}
			{showLogInModal && <LogIn show={showLogInModal} onHide={this._onLogInHide} />}
			{showProfileModal && <Profile show={showProfileModal} onHide={() => {this.setState({showProfileModal: false})}} />}
			</>
		)
	}
}

export default connect(mapStoreToProps, mapDispatchToProps)(NavigationBar);