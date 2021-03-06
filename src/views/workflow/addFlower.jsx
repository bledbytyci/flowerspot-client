import AddFlowerForm from './forms/flower/addFlowerForm.jsx';
import Flower from '../../flower/flower.js';
import FlowerActionCreators from '../../flower/flowerActionCreators.js';
import FlowerSelectors from '../../flower/flowerSelectors.js';
import Modal from '../common/modal.jsx';
import PropTypes from 'prop-types';
import ValidationModel from '../../setup/validationModel.js';
import ValidationSummary from '../common/validationSummary.jsx';
import validateFlowerForm from './forms/flower/addFlowerFormValidation.js';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../styles/modal.css';

const mapStoreToProps = store => {
	return {
		flower: FlowerSelectors.getFlower(store),
		isCreating: FlowerSelectors.isCreating(store),
		isLoading: FlowerSelectors.isLoading(store),
		validationModel: FlowerSelectors.getValidationModel(store)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createFlower: (flower) => dispatch(FlowerActionCreators.createFlower(flower)),
		getFlowers: () => dispatch(FlowerActionCreators.getFlowers()),
		getFlowerById: id => dispatch(FlowerActionCreators.getFlowerById(id)),
		updateFlower: flower => dispatch(FlowerActionCreators.updateFlower(flower))
	}
}

export class AddFlower extends Component {
	constructor(props){
		super(props);

		this.state = {
			flower: new Flower(),
			validationModel: new ValidationModel(),
			showValidationError: false,
		}
	}

	static get propTypes() {
		return {
			history: PropTypes.object,
			isLoggedIn: PropTypes.bool,
			isCreating: PropTypes.bool,
			getFlowers: PropTypes.func,
			getFlowerById: PropTypes.func,
			location: PropTypes.object,
			createFlower: PropTypes.func,
			validationModel: PropTypes.instanceOf(ValidationModel),
			flower: PropTypes.instanceOf(Flower),
			isLoading: PropTypes.bool,
			updateFlower: PropTypes.func,
			match: PropTypes.object
		}
	}

	componentDidMount() {
		const {getFlowerById, match} = this.props;
		console.log(match.params)
		if(match.params.id) {
			getFlowerById(match.params.id);
		}
	}

	componentDidUpdate(prevProps) {
		const {validationModel, isCreating, location, history, getFlowers} = this.props;

		if(prevProps.isLoading && !this.props.isLoading) {
			this.setState({flower: this.props.flower})
		}

		if(prevProps.validationModel.isValid !== validationModel.isValid) {
			this.setState({validationModel: validationModel, showValidationError: true})
		}

		if(prevProps.isCreating && !isCreating){
			history.push(location.pathname);
			getFlowers();
			this._resetFlower();
		}
	}

	_onPropertyChange = (flower, validationModel) => {
		this.setState({flower, validationModel})
	}

	_onSave = () => {
		const {flower} = this.state;
		const {createFlower, updateFlower, history} = this.props;
		const validationModel = validateFlowerForm(flower);
		console.log(validationModel)
		this.setState({ 
			validationModel,
			showValidationError: !validationModel.isValid,
		});
		if(validationModel.isValid) {
			const fd = new FormData();
			if(flower.profile_picture.name){
			fd.append('profile_picture', flower.profile_picture, flower.profile_picture.name)
			}else {
				fd.append('id', flower.id);
			}
			
			fd.append('name', flower.name);
			fd.append('description', flower.description);
			fd.append('latin_name', flower.latin_name);

			if(flower.id) {
				updateFlower(flower)
				history.push(`/${flower.id}`)
			}else {
				createFlower(fd);
			}
		}
	}

	_resetFlower = () => {
		this.setState({
			flower: new Flower(),
			validationModel: new ValidationModel(),
			showValidationError: false
		})
	}

	render(){
		const { history, location } = this.props;
		const { flower, validationModel, showValidationError } = this.state;

		const params = new URLSearchParams(location.search);

		const modalProps = {
			title: flower.id ? "Update flower" : "Add new flower",
			show: params.get('create') ? true : false,
			onHide: () => history.push(location.pathname),
			width: 600
		}
		
		const formProps = {
			flower,
			onPropertyChange: this._onPropertyChange,
			onSave: this._onSave
		}

		return ( 
			params.get('create') &&
			<Modal {...modalProps}>
				<ValidationSummary show={showValidationError && !validationModel.isValid} validationModel={validationModel} />
				<AddFlowerForm {...formProps} />
			</Modal>
		)
	}
}

export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(AddFlower));