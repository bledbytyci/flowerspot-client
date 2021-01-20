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

const signUpSuccess = (user) => ({
    type: AuthActionConstants.SIGN_UP_USER_SUCCESS,
    payload: user
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

const getProfileById = id => ({
    type: AuthActionConstants.GET_PROFILE_BY_ID,
    payload: id
});

const getProfileByIdSuccess = user => ({
    type: AuthActionConstants.GET_PROFILE_BY_ID_SUCCESS,
    payload: user
});

const getProfileByIdError = user => ({
    type: AuthActionConstants.GET_PROFILE_BY_ID_ERROR,
    payload: user
});

const checkUserIsLoggedIn = () => ({
    type: AuthActionConstants.CHECK_USER_LOGGED_IN,
    payload: {}
}) 

const editProfile = (user) => ({
    type: AuthActionConstants.EDIT_PROFILE,
    payload: user
});

const editProfileSuccess = (user) => ({
    type: AuthActionConstants.EDIT_PROFILE_SUCCESS,
    payload: user
})

const editProfileError = error => ({
    type: AuthActionConstants.EDIT_PROFILE_ERROR,
    payload: error
});

const deleteProfile = (id) => ({
    type: AuthActionConstants.DELETE_PROFILE,
    payload: id
});

const deleteProfileSuccess = (user) => ({
    type: AuthActionConstants.DELETE_PROFILE_ERROR,
    payload: user
})

const deleteProfileError = error => ({
    type: AuthActionConstants.DELETE_PROFILE_ERROR,
    payload: error
});

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
    getProfileById,
    getProfileByIdSuccess,
    getProfileByIdError, 
    checkUserIsLoggedIn,
    editProfile,
    editProfileSuccess,
    editProfileError,
    deleteProfile,
    deleteProfileError,
    deleteProfileSuccess
}