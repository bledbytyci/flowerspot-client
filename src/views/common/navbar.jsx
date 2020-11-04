import React, {Component} from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import Logo from '../../logo.svg';
import '../../styles/navbar.css';

class NavigationBar extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
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
                                    <Nav.Link href="#" className="nav-link nav-login-item">Log In</Nav.Link>
                            </Nav.Item>
							<Nav.Item className="mr-5 nav-item">
                                    <Nav.Link href="#" className="nav-link nav-btn">New Account</Nav.Link>
                            </Nav.Item>
					</Nav>
			</Navbar>
		)
	}
}

export default NavigationBar;


{/* <nav className="navbar">
				<a className="navbar-brand" href="#">
				</a>
				<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div className="navbar-nav">
						<a className="nav-item nav-link active" href="#">Home</a>
						<a className="nav-item nav-link" href="#">Features</a>
						<a className="nav-item nav-link" href="#">Pricing</a>
						<a className="nav-item nav-link disabled" href="#">Disabled</a>
					</div>
  				</div>
			</nav> */}