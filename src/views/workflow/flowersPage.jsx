import AuthActionCreators from '../../auth/authActionCreators';
import AuthSelectors from '../../auth/authSelectors';
import FlowerActionCreators from '../../flower/flowerActionCreators';
import FlowerCard from './forms/flower/flowerCard.jsx';
import FlowerSelectors from '../../flower/flowerSelectors';
import Header from '../common/header.jsx';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import { List } from 'immutable';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../../styles/flower.css';

const mapStoreToProps = store => {
	return {
		flowers: FlowerSelectors.getFlowers(store),
		isLoggedIn: AuthSelectors.isLoggedIn(store)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getFlowers: () => dispatch(FlowerActionCreators.getFlowers()),
		checkUserIsLoggedIn: () => dispatch(AuthActionCreators.checkUserIsLoggedIn())
	}
}

export class FlowersPage extends Component {
	constructor(props){
		super(props)
	}

	componentDidMount() {
		this.props.getFlowers();
	}

	static get propTypes() {
		return {
			checkUserIsLoggedIn: PropTypes.func,
			getFlowers: PropTypes.func,
			flowers: PropTypes.instanceOf(List),
			isLoggedIn: PropTypes.bool
		}
	} 

	render() {
		const {flowers, isLoggedIn} = this.props;
		return(
			<>
			<Header />
			<div className="container-fluid flower-container">
				<Row>
					{flowers.map((flower, key) => (
						<FlowerCard flower={flower} key={key} isLoggedIn={isLoggedIn} />
					))}
				</Row>
			</div>
			</>
		)
	}
}

export default connect(mapStoreToProps, mapDispatchToProps)(FlowersPage);