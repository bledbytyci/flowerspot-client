import AuthActionConstants from "./authActionConstants";

const logInUser = (user) => ({
    type: AuthActionConstants.LOG_IN_USER,
    payload: user
});

const logInUserSuccess = () => ({
    type: AuthActionConstants.LOG_IN_USER_SUCCESS,
    payload: {}
});

const logInUserError = error => ({
    type: AuthActionConstants.LOG_IN_USER_ERROR,
    payload: error
});

const signUpUser = (user) => ({
    type: AuthActionConstants.SIGN_UP_USER,
    payload: user
});

const signUpSuccess = () => ({
    type: AuthActionConstants.SIGN_UP_USER_SUCCESS,
    payload: {}
})

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
	logInUser,
	logInUserSuccess,
	logInUserError,
    signUpUser,
    signUpSuccess,
	signUpUserError,
	getProfile,
	getProfileSuccess,
	getProfileError
}