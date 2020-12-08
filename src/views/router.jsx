import AddFlower  from './workflow/addFlower.jsx';
import FlowersPage from './workflow/flowersPage.jsx';
import FavoriteFlowersPage from './workflow/favoriteFlowersPage.jsx';
import LogIn from './workflow/logIn.jsx';
import Navbar from './common/navbar.jsx';
import Profile  from './workflow/profile.jsx';
import SignUp from './workflow/signUp.jsx';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const AppRouter = () => {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path="/" component={FlowersPage} />
				<Route path="/favorites" component={FavoriteFlowersPage} />
			</Switch>
			<Route path="/" component={LogIn} />
			<Route path="/" component={SignUp} />
			<Route path="/" component={Profile} />
			<Route path="/" component={AddFlower} />
	  	</Router>
	)
}

export default AppRouter;