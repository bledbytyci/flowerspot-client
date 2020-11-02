import AuthActionConstants from "./authActionConstants";

const signInUser = (user) => ({
    type: AuthActionConstants.SIGN_IN_USER,
    payload: {user}
});

const signInUserSuccess = authToken => ({
    type: AuthActionConstants.SIGN_IN_USER_SUCCESS,
    payload: authToken
});

const signInUserError = error => ({
    type: AuthActionConstants.SIGN_IN_USER_ERROR,
    payload: error
});

const signUpUser = (user) => ({
    type: AuthActionConstants.SIGN_UP_USER,
    payload: {user}
});

const signUpUserSuccess = authToken => ({
    type: AuthActionConstants.SIGN_UP_USER_SUCCESS,
    payload: authToken
});

const signUpUserError = error => ({
    type: AuthActionConstants.SIGN_UP_USER_ERROR,
    payload: error
});

const getProfile = () => ({
    type: AuthActionConstants.SIGN_UP_USER,
    payload: {}
});

const getProfileSuccess = user => ({
    type: AuthActionConstants.SIGN_UP_USER_SUCCESS,
    payload: user
});

const getProfileError = error => ({
    type: AuthActionConstants.SIGN_UP_USER_ERROR,
    payload: error
});

export default {
	signInUser,
	signInUserSuccess,
	signInUserError,
	signUpUser,
	signUpUserSuccess,
	signUpUserError,
	getProfile,
	getProfileSuccess,
	getProfileError
}