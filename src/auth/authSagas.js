import AuthActionConstants from './authActionConstants';
import AuthActionCreators from './authActionCreators';
import AuthApi from '../auth/authApi';
import HttpResponseCodes from '../setup/httpResponseCodes';
import { put, call, takeLatest } from 'redux-saga/effects';
import ValidationModel from '../setup/validationModel';

function* doLogIn(action) {
    const { response, errorResponse } = yield call(AuthApi.logIn, action.payload);
    if(response) {
        if(response.status === HttpResponseCodes.OK) {
			localStorage.setItem('auth_token', response.data.auth_token);
			yield put(AuthActionCreators.logInUserSuccess());
        }
    }
    else if(errorResponse) {
        const validationModel = new ValidationModel();
        validationModel.isValid = false;
        validationModel.validationMessages = validationModel.validationMessages.push(errorResponse.response?.data?.error)
        yield put(AuthActionCreators.logInUserError(validationModel));
    }
}

function* doSignUp(action) {
    const { response, errorResponse } = yield call(AuthApi.signUp, action.payload);

    if(response) {
        if(response.status === HttpResponseCodes.OK) {
            localStorage.setItem('auth_token', response.data.auth_token);
            yield put(AuthActionCreators.signUpSuccess());
        }
    }
    else if(errorResponse) {
        const validationModel = new ValidationModel();
        validationModel.isValid = false;
        validationModel.validationMessages = validationModel.validationMessages.push(errorResponse.response?.data?.error)
        yield put(AuthActionCreators.signUpUserError(validationModel));
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
	takeLatest(AuthActionConstants.LOG_IN_USER, doLogIn),
	takeLatest(AuthActionConstants.SIGN_UP_USER, doSignUp),
	takeLatest(AuthActionConstants.GET_PROFILE, doGetProfile)
];
