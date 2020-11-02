import AuthActionConstants from './authActionConstants';
import AuthActionCreators from './authActionCreators';
import AuthApi from '../auth/authApi';
import HttpResponseCodes from '../setup/httpResponseCodes';
import { put, call, takeLatest } from 'redux-saga/effects';

function* doSignIn(action) {
    const { response, errorResponse } = yield call(AuthApi.signIn, action.payload);

    if(response) {
        if(response.status === HttpResponseCodes.OK) {
			localStorage.setItem('auth_token', response.data);
			yield put(AuthActionCreators.signInUserSuccess(response.data));
        }
    }
    else if(errorResponse) {
        yield put(AuthActionCreators.signInUserError(response.data));
    }
}

function* doSignUp(user) {
    const { response, errorResponse } = yield call(AuthApi.signUp, user);

    if(response) {
        if(response.status === HttpResponseCodes.OK) {
			localStorage.setItem('auth_token', response.data);
			yield put(AuthActionCreators.signUpUserSuccess(response.data));
        }
    }
    else if(errorResponse) {
        yield put(AuthActionCreators.signUpUserError(errorResponse));
    }
}

function* doGetProfile() {
    const { response, errorResponse } = yield call(AuthApi.getProfile);

    if(response) {
        if(response.status === HttpResponseCodes.OK) {
			yield put(AuthActionCreators.getProfileSuccess(response.data));
        }
    }
    else if(errorResponse) {
        yield put(AuthActionCreators.getProfileError(errorResponse));
    }
}

export default [
	takeLatest(AuthActionConstants.SIGN_IN_USER, doSignIn),
	takeLatest(AuthActionConstants.SIGN_UP_USER, doSignUp),
	takeLatest(AuthActionConstants.GET_PROFILE, doGetProfile)
];
