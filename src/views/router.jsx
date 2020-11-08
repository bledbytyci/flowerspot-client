import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './common/navbar.jsx';
import FlowersPage from './workflow/flowersPage.jsx';
import LogIn from './workflow/logIn.jsx';
import Profile  from './workflow/profile.jsx';
import SignUp from './workflow/signUp.jsx';

const AppRouter = () => {
	return (
		<Router>
			<Navbar />
			<Route path="/" component={FlowersPage} />
			<Route path="/login/:show"  component={LogIn} />
			<Route path="/signup/:show" component={SignUp} />
			<Route path="/profile/:show" component={Profile} />
	  	</Router>
	)
}

export default AppRouter;