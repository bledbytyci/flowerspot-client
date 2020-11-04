import FlowerActionCreators from '../../flower/flowerActionCreators.js';
import React, { Component } from 'react';
import "../../styles/header.css";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
const mapDispatchToProps = dispatch => {
	return {
		getFlowers: filter => dispatch(FlowerActionCreators.getFlowers(filter))  
	}
}

class Header extends Component {
	constructor(props){
		super(props);
		this.state = {
			filter: ''
		};
	}

	componentDidUpdate(prevState) {
		const { filter } = this.state;
		const { getFlowers } = this.props;

		if(prevState.filter !== this.state.filter){
			getFlowers(filter);
		}
	}

	static get propTypes(){
		return {
			getFlowers: PropTypes.func
		}
	}

	_onFilterChange = filter => {
		this.setState({filter});
	}

    render() {
        return (
            <header className="header text-center text-white d-flex">
                <div className="container my-auto">
                    <Row className="row">
                        <Col lg={10} className="mx-auto" >
                            <h1>
                                Discover flowers around you
                            </h1>
                        </Col>
                        <Col lg={8} className="mx-auto">
                            <p className="text-faded mb-5">Explore between more than 8.427 sightings</p>
							<Col md={12} className="input-group">
				                <input onChange={(e) => this._onFilterChange(e.target.value)} className="form-control py-2 border-right-0 border" type="search" placeholder="Looking for something specific?" id="search" name="search"/>
								<span className="input-group-append">
									<button className="btn btn-outline-secondary border-left-0 border" type="button">
										<FontAwesomeIcon icon={faSearch} className="search-icon"/>
									</button>
								</span>
           					</Col>
                        </Col>
                    </Row>
                </div>
            </header>
        );
    }
}
export default connect(null, mapDispatchToProps)(Header);