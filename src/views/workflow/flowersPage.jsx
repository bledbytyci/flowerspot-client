import React, {Component} from 'react';
import { connect } from 'react-redux';
import FlowerActionCreators from '../../flower/flowerActionCreators';
import FlowerSelectors from '../../flower/flowerSelectors';
import '../../styles/flower.css';
import FlowerCard from './forms/flower/flowerCard.jsx';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { Row } from 'react-bootstrap';

const mapStoreToProps = store => {
	return {
		flowers: FlowerSelectors.getFlowers(store)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getFlowers: () => dispatch(FlowerActionCreators.getFlowers())
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
			getFlowers: PropTypes.func,
			flowers: PropTypes.instanceOf(List)
		}
	} 

	render() {
		const {flowers} = this.props;
		return(
			<div className="container-fluid flower-container">
				<Row>
					{flowers.map((flower, key) => (
						<FlowerCard flower={flower} key={key}/>
					))}
				</Row>
			</div>
		)
	}
}

export default connect(mapStoreToProps, mapDispatchToProps)(FlowersPage);