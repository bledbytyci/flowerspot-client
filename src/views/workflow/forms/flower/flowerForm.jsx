import Flower from '../../../../flower/flower';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import '../../../../styles/flower.css';
import User from '../../../../user/user';
import { Link } from 'react-router-dom';

export class FlowerForm extends Component {
	constructor(props){
		super(props)
	}

	static get propTypes(){
		return {
			flower: PropTypes.instanceOf(Flower),
			user: PropTypes.instanceOf(User),
			isLoggedIn: PropTypes.bool,
			deleteFlower: PropTypes.func
		}
	} 

	render() {
		const { flower, user, deleteFlower } = this.props;

		return (
            <div className="flower-header">
                <div className="container">
                    <Row>
                        <Col md={12} lg={6} className="mx-auto">
							<div className="card border-0">
								<img src={flower.profile_picture} className="card-img" alt="" width={100} height={350} />
							</div>
                        </Col>
						<Col md={12} lg={6} className="mx-auto">
                            <h2>{flower.name}</h2>
                            <h3>{flower.latin_name}</h3>
                            <p>{flower.description}</p>
                            <h3>Sightings: <b>{flower.sightnings}</b></h3>
							<Link to={{pathname: location.pathname, search: `?userprofile=true?id=${flower.created_by.id}`}} style={{color: 'white'}} className="no-underline">
							<p>Posted by: <b>{`${flower.created_by?.first_name} ${flower.created_by?.last_name}`}</b></p>
							</Link>
							{(user.id === flower.created_by.id || user.is_admin) &&
							<p>
								<>
								<button className="form-btn-white mr-3" 
									onClick={(e) => {e.preventDefault();}}>
									<Link to={{pathname: location.pathname, search: '?create=true'}} className="no-underline">
											Update Flower
									</Link>
										</button>
								<button className="form-btn-red" 
									onClick={(e) => {e.preventDefault(); deleteFlower(); }}>Delete Flower</button>
									</>
							</p>
							}
                        </Col>
                    </Row>
                </div>
            </div>
		)
	}
}

export default FlowerForm;