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
			localStorage.setItem('auth_token', response.data.access_token);
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

function* doLogOut() {
    localStorage.setItem('auth_token', '');
    yield put(AuthActionCreators.logOutUserSuccess());
}

function* doSignUp(action) {
    const { response, errorResponse } = yield call(AuthApi.signUp, action.payload);
    if(response) {
        if(response.status === HttpResponseCodes.OK) {
            yield put(AuthActionCreators.signUpSuccess(response.data.user));
        }
    }
    else if(errorResponse) {
        const validationModel = new ValidationModel();
        validationModel.isValid = false;
        Object.values(errorResponse.response?.data?.errors).forEach(error => 
            validationModel.validationMessages =  validationModel.validationMessages.push(error[0]));
        yield put(AuthActionCreators.signUpUserError(validationModel));
    }
}

function* doEditProfile(action) {
    const { response, errorResponse } = yield call(AuthApi.editProfile, action.payload);
    if(response) {
        if(response.status === HttpResponseCodes.OK) {
            yield put(AuthActionCreators.editProfileSuccess(response.data.user));
        }
    }
    else if(errorResponse) {
        const validationModel = new ValidationModel();
        validationModel.isValid = false;
        Object.values(errorResponse.response?.data?.errors).forEach(error => 
           validationModel.validationMessages =  validationModel.validationMessages.push(error[0]))

           yield put(AuthActionCreators.editProfileError(validationModel));
    }
}

function* doDeleteProfile(action) {
    const { response, errorResponse } = yield call(AuthApi.deleteProfile, action.payload);
    if(response) {
        if(response.status === HttpResponseCodes.OK) {
            yield put(AuthActionCreators.deleteProfileSuccess());
        }
    }
    else if(errorResponse) {
        console.log(errorResponse)
        yield put(AuthActionCreators.deleteProfileError());
    }
}

function* doGetProfile() {
    const { response, errorResponse } = yield call(AuthApi.getProfile);
    console.log(response.data)
    if(response) {
        if(response.status === HttpResponseCodes.OK) {
			yield put(AuthActionCreators.getProfileSuccess(response.data));
        }
    }
    else if(errorResponse) {
        console.log('Following error occurred: ', errorResponse);
    }
}

export default [
	takeLatest(AuthActionConstants.LOG_IN_USER, doLogIn),
	takeLatest(AuthActionConstants.SIGN_UP_USER, doSignUp),
	takeLatest(AuthActionConstants.EDIT_PROFILE, doEditProfile),
	takeLatest(AuthActionConstants.DELETE_PROFILE, doDeleteProfile),
    takeLatest(AuthActionConstants.GET_PROFILE, doGetProfile),
    takeLatest(AuthActionConstants.LOG_OUT_USER, doLogOut)
];
