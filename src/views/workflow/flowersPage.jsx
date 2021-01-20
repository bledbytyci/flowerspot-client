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
		isLoadingUser: AuthSelectors.isLoading(store),
		isMarkedAsFavorite: FlowerSelectors.isMarkedAsFavorite(store)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		checkUserIsLoggedIn: () => dispatch(AuthActionCreators.checkUserIsLoggedIn()),
		getFlowers: () => dispatch(FlowerActionCreators.getFlowers()),
		getRandomFlowers: () => dispatch(FlowerActionCreators.getRandomFlowers()),
		markFlowerFavorite: flower_id => dispatch(FlowerActionCreators.markFlowerFavorite(flower_id)),
		updateFlower: flower => dispatch(FlowerActionCreators.updateFlower(flower)),
		resetFlowers: () => dispatch(FlowerActionCreators.resetFlowers())
	}
}

export class FlowersPage extends Component {
	constructor(props){
		super(props)
	}

	componentDidMount() {
		this.props.getFlowers()
	}

	componentDidUpdate(prevProps) {
		const {getFlowers, getRandomFlowers, isMarkedAsFavorite, isLoadingUser, isLoggedIn} = this.props;

		if(prevProps.isMarkedAsFavorite && !isMarkedAsFavorite) {
			getFlowers();			
		}

		if(prevProps.isLoadingUser && !isLoadingUser ) {
			if(isLoggedIn) {
				getFlowers();
			} else {
				getRandomFlowers();
			}
		}

		if(prevProps.isLoggedIn !== this.props.isLoggedIn) {
			getRandomFlowers();
		}
	}

	componentWillUnmount() {
		this.props.resetFlowers()
	}

	static get propTypes() {
		return {
			checkUserIsLoggedIn: PropTypes.func,
			getFlowers: PropTypes.func,
			getRandomFlowers: PropTypes.func,
			flowers: PropTypes.instanceOf(List),
			isLoggedIn: PropTypes.bool,
			isLoadingUser: PropTypes.bool,
			isMarkedAsFavorite: PropTypes.bool,
			markFlowerFavorite: PropTypes.func,
			history: PropTypes.bool,
			resetFlowers: PropTypes.func,
			updateFlower: PropTypes.func
		}
	}

	_onStarClick = (flower_id) => {
		const { markFlowerFavorite } = this.props;
		markFlowerFavorite(flower_id);
	}
	_onItemClick = (flower) => {
		const {history, updateFlower} = this.props;
		history.push(`/${flower.id}`)
		const clonedFlower = flower
		clonedFlower.sightnings = Number(clonedFlower.sightnings) + 1;
		updateFlower(clonedFlower);
	}

	render() {
		const {flowers, isLoggedIn} = this.props;
		return(
			<>
			<Header />
			<div className="container-fluid flower-container">
				<Row>
					{flowers.map((flower, key) => (
						<FlowerCard flower={flower} key={key} isLoggedIn={isLoggedIn} onStarClick={this._onStarClick} onItemClick={this._onItemClick}/>
					))}
				</Row>
			</div>
			</>
		)
	}
}

export default connect(mapStoreToProps, mapDispatchToProps)(FlowersPage);