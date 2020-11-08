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
		isLoggedIn: AuthSelectors.isLoggedIn(store),
		isMarkedAsFavorite: FlowerSelectors.isMarkedAsFavorite(store)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		checkUserIsLoggedIn: () => dispatch(AuthActionCreators.checkUserIsLoggedIn()),
		getFlowers: () => dispatch(FlowerActionCreators.getFlowers()),
		markFlowerFavorite: flower_id => dispatch(FlowerActionCreators.markFlowerFavorite(flower_id)),
		resetFlowers: () => dispatch(FlowerActionCreators.resetFlowers())
	}
}

export class FlowersPage extends Component {
	constructor(props){
		super(props)
	}

	componentDidMount() {
		this.props.getFlowers();
	}

	componentDidUpdate(prevProps) {
		if(prevProps.isMarkedAsFavorite && !this.props.isMarkedAsFavorite) {
			this.props.getFlowers()
		}
	}

	componentWillUnmount() {
		this.props.resetFlowers()
	}

	static get propTypes() {
		return {
			checkUserIsLoggedIn: PropTypes.func,
			getFlowers: PropTypes.func,
			flowers: PropTypes.instanceOf(List),
			isLoggedIn: PropTypes.bool,
			isMarkedAsFavorite: PropTypes.bool,
			markFlowerFavorite: PropTypes.bool,
			resetFlowers: PropTypes.func
		}
	}

	_onStarClick = (flower_id) => {
		const { markFlowerFavorite } = this.props;
		markFlowerFavorite(flower_id);
	}

	render() {
		const {flowers, isLoggedIn} = this.props;
		return(
			<>
			<Header />
			<div className="container-fluid flower-container">
				<Row>
					{flowers.map((flower, key) => (
						<FlowerCard flower={flower} key={key} isLoggedIn={isLoggedIn} onStarClick={this._onStarClick} />
					))}
				</Row>
			</div>
			</>
		)
	}
}

export default connect(mapStoreToProps, mapDispatchToProps)(FlowersPage);