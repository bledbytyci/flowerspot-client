import { takeLatest, call, put } from 'redux-saga/effects';
import HttpResponseCodes from '../setup/httpResponseCodes';
import ValidationModel from '../setup/validationModel';
import FlowerActionConstants from './flowerActionConstants';
import FlowerActionCreators from './flowerActionCreators.js';
import FlowerApi from './flowerApi';

function* doCreateFlower(action) {
    const { response, errorResponse } = yield call(FlowerApi.createFlower, action.payload);
    if(response && response.status === HttpResponseCodes.OK) {
        yield put(FlowerActionCreators.createFlowerSuccess(response.data));
    }
    else if(errorResponse) {
        const validationModel = new ValidationModel();
        validationModel.isValid = false;
        Object.values(errorResponse.response?.data?.errors).forEach(error => 
           validationModel.validationMessages =  validationModel.validationMessages.push(error[0]))

           yield put(FlowerActionCreators.createFlowerError(validationModel));
    }
}

function* doUpdateFlower(action) {
    console.log(action.payload)
    const { response, errorResponse } = yield call(FlowerApi.updateFlower, action.payload);
    if(response && response.status === HttpResponseCodes.OK) {
        yield put(FlowerActionCreators.updateFlowerSuccess(response.data));
    }
    else if(errorResponse) {
        const validationModel = new ValidationModel();
        validationModel.isValid = false;
        Object.values(errorResponse.response?.data?.errors).forEach(error => 
           validationModel.validationMessages =  validationModel.validationMessages.push(error[0]))

           yield put(FlowerActionCreators.updateFlowerError(validationModel));
    }
}

function* doSetSightnings(action) {
    const { response, errorResponse } = yield call(FlowerApi.setSightings, action.payload);
    if(response && response.status === HttpResponseCodes.OK) {
        yield put(FlowerActionCreators.setSightingsSuccess(response.data));
    }
    else if(errorResponse) {
        yield put(FlowerActionCreators.setSightingsError());
        console.log('Following error occurred: ', errorResponse);
    }
}

function* doGetFlowerById(action) {
    const { response, errorResponse } = yield call(FlowerApi.getFlowerById, action.payload);
    if(response && response.status === HttpResponseCodes.OK) {
        yield put(FlowerActionCreators.getFlowerByIdSuccess(response.data.flower));
    }
    else if(errorResponse) {
        yield put(FlowerActionCreators.getFlowerByIdError());
        console.log('Following error occurred: ', errorResponse);
    }
}

function* doGetFlowersFiltered(action) {
    const { response, errorResponse } = yield call(FlowerApi.getFlowersFiltered, action.payload);
    if(response && response.status === HttpResponseCodes.OK) {
        yield put(FlowerActionCreators.getFlowersFilteredSuccess(response.data));
    }
    else if(errorResponse) {
        yield put(FlowerActionCreators.getFlowersFilteredError());
        console.log('Following error occurred: ', errorResponse);
    }
}

function* doGetFlowers() {
    const { response, errorResponse } = yield call(FlowerApi.getFlowers);
    if(response && response.status === HttpResponseCodes.OK) {
        yield put(FlowerActionCreators.getFlowersSuccess(response.data));
    }
    else if(errorResponse) {
        yield put(FlowerActionCreators.getFlowersError());
        console.log('Following error occurred: ', errorResponse);
    }
}


function* doGetRandomFlowers() {
    const { response, errorResponse } = yield call(FlowerApi.getRandomFlowers);
    if(response && response.status === HttpResponseCodes.OK) {
        yield put(FlowerActionCreators.getRandomFlowersSuccess(response.data));
    }
    else if(errorResponse) {
        yield put(FlowerActionCreators.getRandomFlowersError());
        console.log('Following error occurred: ', errorResponse);
    }
}

function* doGetFavoriteFlowers() {
    const { response, errorResponse } = yield call(FlowerApi.getFavoriteFlowers);
    console.log(response)
    if(response && response.status === HttpResponseCodes.OK) {
        yield put(FlowerActionCreators.getFavoriteFlowersSuccess(response.data));
    }
    else if(errorResponse) {
        console.log('Following error occurred: ', errorResponse);
        yield put(FlowerActionCreators.getFavoriteFlowersError());
    }
}

function* doMarkFlowerFavorite(action) {
    const { response, errorResponse } = yield call(FlowerApi.markFlowerFavorite, action.payload);
    if(response && response.status === HttpResponseCodes.OK) {
        yield put(FlowerActionCreators.markFlowerFavoriteSuccess());
    }
    else if(errorResponse) {
        console.log('Following error occurred: ', errorResponse);
    }
}

function* doDeleteFlower(action) {
    const { response, errorResponse } = yield call(FlowerApi.deleteFlower, action.payload);
    if(response) {
        if(response.status === HttpResponseCodes.OK) {
            yield put(FlowerActionCreators.deleteFlowerSuccess());
        }
    }
    else if(errorResponse) {
        console.log(errorResponse)
        yield put(FlowerActionCreators.deleteFlowerError());
    }
}

export default [
	takeLatest(FlowerActionConstants.GET_FLOWERS, doGetFlowers),
	takeLatest(FlowerActionConstants.GET_FLOWERS_FILTERED, doGetFlowersFiltered),
	takeLatest(FlowerActionConstants.GET_FAVORITE_FLOWERS, doGetFavoriteFlowers),
    takeLatest(FlowerActionConstants.GET_FLOWER_BY_ID, doGetFlowerById),
    takeLatest(FlowerActionConstants.CREATE_FLOWER, doCreateFlower),
    takeLatest(FlowerActionConstants.UPDATE_FLOWER, doUpdateFlower),
    takeLatest(FlowerActionConstants.MARK_FLOWER_FAVORITE, doMarkFlowerFavorite),
    takeLatest(FlowerActionConstants.GET_RANDOM_FLOWERS, doGetRandomFlowers),
    takeLatest(FlowerActionConstants.SET_SIGHTNINGS, doSetSightnings),
    takeLatest(FlowerActionConstants.DELETE_FLOWER, doDeleteFlower)
];