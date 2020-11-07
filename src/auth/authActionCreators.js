import AuthActionConstants from "./authActionConstants";

const logInUser = (user) => ({
    type: AuthActionConstants.LOG_IN_USER,
    payload: user
});

const logInUserSuccess = () => ({
    type: AuthActionConstants.LOG_IN_USER_SUCCESS,
    payload: {}
});

const logOutUser = () => ({
    type: AuthActionConstants.LOG_OUT_USER,
    payload: {}
});

const logOutUserSuccess = () => ({
    type: AuthActionConstants.LOG_OUT_USER_SUCCESS,
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
    type: AuthActionConstants.GET_PROFILE,
    payload: {}
});

const getProfileSuccess = user => ({
    type: AuthActionConstants.GET_PROFILE_SUCCESS,
    payload: user
});

const getProfileError = error => ({
    type: AuthActionConstants.GET_PROFILE_ERROR,
    payload: error
});

const checkUserIsLoggedIn = () => ({
    type: AuthActionConstants.CHECK_USER_LOGGED_IN,
    payload: {}
}) 

export default {
	logInUser,
	logInUserSuccess,
    logInUserError,
    logOutUser,
    logOutUserSuccess,
    signUpUser,
    signUpSuccess,
	signUpUserError,
	getProfile,
	getProfileSuccess,
    getProfileError,
    checkUserIsLoggedIn
}