import Flower from '../../../../flower/flower';
import PropTypes from 'prop-types';
import star from '../../../../img/star.png'
import React, {Component} from 'react';
import { Col } from 'react-bootstrap';

export class FlowerCard extends Component {
	constructor(props){
		super(props)
	}

	static get propTypes(){
		return {
			flower: PropTypes.instanceOf(Flower),
			isLoggedIn: PropTypes.bool
		}
	} 

	render() {
		const { flower, isLoggedIn } = this.props;
		return (
			<Col lg={3} md={4} sm={6} xs={6}>
				<div className="card border-0 flower-card">
					<img src={flower.profile_picture} className="card-img" alt="" width={280} height={350} />
					<div className="card-img-overlay">
						{isLoggedIn &&
							<button className={`flower-star ${flower.favorite ? 'flower-star-favorite' : ''}`}>
								<img src={star} className="flower-star-img"/>
							</button>
						}
						<p className="font-weight-bold p-2 flower-heading">{flower.name}</p>
						<p className="font-weight-bold p-2 flower-subheading">{flower.latin_name}</p>
						<div className="flower-sightings-wrapper">
							<button className="font-weight-bold p-2 flower-sightings"><span className="flower-sightings-text">{flower.sightings} sightings</span></button>
						</div>
					</div>
				</div>
			</Col>
		)
	}
}

export default FlowerCard;