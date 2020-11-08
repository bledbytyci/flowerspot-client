import FlowerActionCreators from '../../flower/flowerActionCreators.js';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import "../../styles/header.css";

const mapDispatchToProps = dispatch => {
	return {
		getFlowersFiltered: filter => dispatch(FlowerActionCreators.getFlowersFiltered(filter))  
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
		const { getFlowersFiltered } = this.props;

		if(prevState.filter !== this.state.filter){
			getFlowersFiltered(filter);
		}
	}

	static get propTypes(){
		return {
			getFlowersFiltered: PropTypes.func
		}
	}

	_onFilterChange = filter => {
		this.setState({filter});
	}

    render() {
        return (
            <header className="header">
                <div className="container">
                    <Row>
                        <Col lg={12} className="mx-auto">
                            <h1>Discover flowers around you</h1>
                        </Col>
                        <Col lg={7} className="mx-auto">
                            <p className="text-faded mb-5">Explore between more than 8.427 sightings</p>
							<div className="input-group">
								<input onChange={(e) => this._onFilterChange(e.target.value)} placeholder="Looking for something specific?"
									className="form-control py-2 search-input" type="text" name="search"/>
									<Button className="search-btn">
										<FontAwesomeIcon icon={faSearch} className="search-icon"/>
									</Button>
           					</div>
                        </Col>
                    </Row>
                </div>
            </header>
        );
    }
}
export default connect(null, mapDispatchToProps)(Header);