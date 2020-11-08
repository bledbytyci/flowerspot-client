import { takeLatest, call, put } from 'redux-saga/effects';
import HttpResponseCodes from '../setup/httpResponseCodes';
import FlowerActionConstants from './flowerActionConstants';
import FlowerActionCreators from './flowerActionCreators.js';
import FlowerApi from './flowerApi';

function* doGetFlowersFiltered(action) {
    const { response, errorResponse } = yield call(FlowerApi.getFlowersFiltered, action.payload);
    if(response && response.status === HttpResponseCodes.OK) {
        yield put(FlowerActionCreators.getFlowersFilteredSuccess(response.data));
    }
    else if(errorResponse) {
        console.log('Following error occurred: ', errorResponse);
    }
}

function* doGetFlowers() {
    const { response, errorResponse } = yield call(FlowerApi.getFlowers);
    if(response && response.status === HttpResponseCodes.OK) {
        yield put(FlowerActionCreators.getFlowersSuccess(response.data));
    }
    else if(errorResponse) {
        console.log('Following error occurred: ', errorResponse);
    }
}

export default [
	takeLatest(FlowerActionConstants.GET_FLOWERS, doGetFlowers),
	takeLatest(FlowerActionConstants.GET_FLOWERS_FILTERED, doGetFlowersFiltered)
];