import AuthActionCreators from '../../auth/authActionCreators';
import AuthSelectors from '../../auth/authSelectors';
import FlowerActionCreators from '../../flower/flowerActionCreators';
import FlowerCard from './forms/flower/flowerCard.jsx';
import FlowerSelectors from '../../flower/flowerSelectors';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import { List } from 'immutable';
import { Col, Row } from 'react-bootstrap';
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
		getFavoriteFlowers: () => dispatch(FlowerActionCreators.getFavoriteFlowers()),
		checkUserIsLoggedIn: () => dispatch(AuthActionCreators.checkUserIsLoggedIn()),
		resetFlowers: () => dispatch(FlowerActionCreators.resetFlowers())
	}
}

export class FavoriteFlowersPage extends Component {
	constructor(props){
		super(props)
	}

	componentDidMount() {
		const { checkUserIsLoggedIn, isLoggedIn, getFavoriteFlowers } = this.props;
		checkUserIsLoggedIn(); 
		if(isLoggedIn) {
			getFavoriteFlowers();
		}
	}

	componentDidUpdate(prevProps) {
		if(prevProps.isLoggedIn != this.props.isLoggedIn){
			const { getFavoriteFlowers } = this.props;
			getFavoriteFlowers();
		}
	}

	componentWillUnmount() {
		this.props.resetFlowers()
	}

	static get propTypes() {
		return {
			checkUserIsLoggedIn: PropTypes.func,
			getFavoriteFlowers: PropTypes.func,
			flowers: PropTypes.instanceOf(List),
			isLoggedIn: PropTypes.bool,
			resetFlowers: PropTypes.func
		}
	} 

	render() {
		const { flowers, isLoggedIn } = this.props;

		return(
			<>
			<div className="container-fluid flower-container">
				<Row>
					<Col lg={12} className="mx-auto">
						<p className="fav-header">{!isLoggedIn ? 'Please log in to view your favorite flowers': flowers.size === 0 ? 'No flowers found' : 'Favorite Flowers'}</p>
					</Col>
					{flowers.size !== 0 &&
					(flowers.map((flower, key) => (
						<FlowerCard flower={flower} key={key} isLoggedIn={isLoggedIn} />
					)))}
				</Row>
			</div>
			</>
		)
	}
}

export default connect(mapStoreToProps, mapDispatchToProps)(FavoriteFlowersPage);