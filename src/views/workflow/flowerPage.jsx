import AuthSelectors from '../../auth/authSelectors';
import FlowerSelectors from "../../flower/flowerSelectors";
import FlowerActionCreators from "../../flower/flowerActionCreators";
import React, { Component } from "react";
import { connect } from "react-redux";
import Flower from "../../flower/flower";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import FlowerForm from "./forms/flower/flowerForm";


const mapStoreToProps = store => {
	return {
	flower: FlowerSelectors.getFlower(store),
	isLoading: FlowerSelectors.isLoading(store),
	isLoggedIn: AuthSelectors.isLoggedIn(store),
	isUpdating: FlowerSelectors.isUpdating(store),
	user: AuthSelectors.getUser(store)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getFlowerById: id => dispatch(FlowerActionCreators.getFlowerById(id)),
		deleteFlower: id => dispatch(FlowerActionCreators.deleteFlower(id))
	}
}

export class FlowerPage extends Component {
	constructor(props){
		super(props);
	}

	componentDidMount() {
		const {getFlowerById, match} = this.props;
		getFlowerById(match.params.id);
	}

	componentDidUpdate(prevProps) {
		if(prevProps.isUpdating && !this.props.isUpdating) {
			const {getFlowerById, match} = this.props;
			getFlowerById(match.params.id);
		}
	}

	static get propTypes() {
		return {
			flower: PropTypes.instanceOf(Flower),
			getFlowerById: PropTypes.func,
			isLoading: PropTypes.bool,
			isUpdating: PropTypes.bool,
			isLoggedIn: PropTypes.bool,
			match: PropTypes.object,
			user: PropTypes.object,
			deleteFlower: PropTypes.func,
			location: PropTypes.object,
			history: PropTypes.object
			}
	}

	_deleteFlower = () => {
		const {deleteFlower, history,match}= this.props;
		deleteFlower(match.params.id);
		history.push(`/`)
	}

	
	render() {
		const {flower, isLoggedIn, user} = this.props;
		return(
			<FlowerForm flower={flower} isLoggedIn={isLoggedIn} user={user} deleteFlower={this._deleteFlower} />
			)
	}
}

export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(FlowerPage));