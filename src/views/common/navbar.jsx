import React, {Component} from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import Logo from '../../logo.svg';
import '../../styles/navbar.css';
import LogIn from '../workflow/logIn.jsx';
import SignUp from '../workflow/signUp.jsx';



class NavigationBar extends Component {
	constructor(props){
		super(props);

		this.state = {
			showSignUpModal: false,
			showLogInModal: false,
			showProfileModal: false
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
		const { showSignUpModal, showLogInModal } = this.state;
		return (
			<>
			<Navbar className="nav">
				<Navbar.Brand href="#/">
				<img src={Logo} width="169" height="30" alt=""/>
                </Navbar.Brand>
                <Nav className="ml-auto d-flex align-items-center">
                            <Nav.Item className="mr-5 nav-item">
                                    <Nav.Link href="#" className="nav-link">Flowers</Nav.Link>
                            </Nav.Item>
							<Nav.Item className="mr-5 nav-item">
                                    <Nav.Link href="#" className="nav-link">Latest Sightings</Nav.Link>
                            </Nav.Item>
							<Nav.Item className="mr-5 nav-item">
                                    <Nav.Link href="#" className="nav-link">Favorites</Nav.Link>
                            </Nav.Item>
							<Nav.Item className="mr-5 nav-item">
                                    <Nav.Link href="#" className="nav-link nav-login-item"
									onClick={() => this.setState({showLogInModal: true})}>Log In</Nav.Link>
                            </Nav.Item>
							<Nav.Item className="mr-5 nav-item">
									<Nav.Link href="#" className="nav-link nav-btn" 
										onClick={() => this.setState({showSignUpModal: true})}>New Account</Nav.Link>
                            </Nav.Item>
					</Nav>
			</Navbar>
			{showSignUpModal && <SignUp show={showSignUpModal} onHide={this._onSignUpHide} />}
			{showLogInModal && <LogIn show={showLogInModal} onHide={this._onLogInHide} />}
			</>
		)
	}
}

export default NavigationBar;