import { takeLatest, call, put } from 'redux-saga/effects';
import HttpResponseCodes from '../setup/httpResponseCodes';
import FlowerActionConstants from './flowerActionConstants';
import FlowerActionCreators from './flowerActionCreators.js';
import FlowerApi from './flowerApi';

function* doGetFllowers(action) {
    const { response, errorResponse } = yield call(FlowerApi.getFlowers, action);

    if(response && response.status === HttpResponseCodes.OK) {
        yield put(FlowerActionCreators.getFlowersSuccess(response.data));
    }
    else if(errorResponse) {
		yield put(FlowerActionCreators.getFlowers(errorResponse));
    }
}

export default [
	takeLatest(FlowerActionConstants.GET_FLOWERS, doGetFllowers)
];