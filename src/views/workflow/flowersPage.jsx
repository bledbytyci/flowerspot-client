import React, {Component} from 'react';
import { connect } from 'react-redux';
import FlowerActionCreators from '../../flower/flowerActionCreators';
import FlowerSelectors from '../../flower/flowerSelectors';
import '../../styles/flower.css';
import FlowerCard from './forms/flower/flowerCard.jsx';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { Row } from 'react-bootstrap';
import AuthSelectors from '../../auth/authSelectors';
import AuthActionCreators from '../../auth/authActionCreators';

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

class FlowersPage extends Component {
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
			<div className="container-fluid flower-container">
				<Row>
					{flowers.map((flower, key) => (
						<FlowerCard flower={flower} key={key} isLoggedIn={isLoggedIn} />
					))}
				</Row>
			</div>
		)
	}
}

export default connect(mapStoreToProps, mapDispatchToProps)(FlowersPage);