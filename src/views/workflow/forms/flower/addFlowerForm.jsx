import Flower from "../../../../flower/flower";
import PropTypes from 'prop-types'
import validateFlowerForm from './addFlowerFormValidation.js'
import React, {Component} from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import '../../../../styles/form.css';

const ATTRIBUTES = {
	NAME: 'name',
	LATIN_NAME: 'latin_name',
	DESCRIPTION: 'description',
	PROFILE_PICTURE: 'profile_picture'
}

class AddFlowerForm extends Component {
	static get propTypes() {
		return {
			flower: PropTypes.instanceOf(Flower),
			onPropertyChange: PropTypes.func,
			onSave: PropTypes.func,
		}
	}

	_onPropertyChange = (propertyName, propertyValue) => {
		const { flower, onPropertyChange } = this.props;
		const newFlower = Object.assign(Object.create(Object.getPrototypeOf(flower)), flower);
		newFlower[propertyName] = propertyValue;
		const validationModel = validateFlowerForm(newFlower)
		onPropertyChange(newFlower, validationModel);
	};

	render(){
		const { flower, onSave } = this.props;

		return (
			<Form horizontal="true">
				<Row>
					<Col>
					<label className="label">Name</label>
						<input
							onChange={e => this._onPropertyChange([ATTRIBUTES.NAME], e.target.value)}
							value={flower[ATTRIBUTES.NAME]}
							className="input"
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<label className="label">Latin Name</label>
						<input
							onChange={e => this._onPropertyChange([ATTRIBUTES.LATIN_NAME], e.target.value)}
							value={flower[ATTRIBUTES.LATIN_NAME]}
							className="input"
						/>
					</Col>
				</Row>
				<Row>
					<Col>
					<label className="label">Description</label>
						<input
							as="textarea"
							onChange={e => this._onPropertyChange([ATTRIBUTES.DESCRIPTION], e.target.value)}
							value={flower[ATTRIBUTES.DESCRIPTION]}
							className="input"
						/>
					</Col>
				</Row>
					<Row>
						<Col md={3}>
						<label className="label">Profile Picture</label>
						</Col>
						<Col>
						<Form.File 
							className="file-input"
							onChange={e => this._onPropertyChange([ATTRIBUTES.PROFILE_PICTURE], e.target.files[0])}
						/>
						</Col>
					</Row>
				<Row>
					<Col>
						<button className="form-btn signup-btn" 
						onClick={(e) => {
							e.preventDefault()
							onSave()
							}}>{flower.id ? 'Update Flower' : 'Create Flower'}</button>
					</Col>
				</Row> 
			</Form>
		)
	}
}

export default AddFlowerForm;