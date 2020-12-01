import { Map } from 'immutable';
import AuthActionConstants from './authActionConstants';
import User from '../user/user';
import ValidationModel from '../setup/validationModel';

const initialState = Map({
    user: new User(), 
    isCreating: false,
    isLoggedIn: false,
    isUpdating: false,
    isDeleting: false,
    isLoading: false,
    validationModel: new ValidationModel()
});

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthActionConstants.LOG_IN_USER: {
            return state.withMutations(state => {
                state.set('validationModel', new ValidationModel());
            });
        }

        case AuthActionConstants.SIGN_UP_USER: {
            return state.withMutations(state => {
                state.set('validationModel', new ValidationModel());
                state.set('isCreating', true);
            });
        }

        case AuthActionConstants.EDIT_PROFILE: {
            return state.withMutations(state => {
                state.set('validationModel', new ValidationModel());
                state.set('isUpdating', true);
            });
        }

        case AuthActionConstants.DELETE_PROFILE: {
            return state.set('isDeleting', true);
        }

        case AuthActionConstants.GET_PROFILE: {
            return state.set('isLoading', true);
        }

        case AuthActionConstants.LOG_IN_USER_SUCCESS: {
            return state.set('isLoggedIn', true);
        }

        case AuthActionConstants.LOG_OUT_USER_SUCCESS: {
            return state.set('isLoggedIn', false);
        }
        
		case AuthActionConstants.SIGN_UP_USER_SUCCESS: {
            return state.withMutations(state => {
                state.set('user', new User(action.payload));
                state.set('isCreating', false);
            });
        }

        case AuthActionConstants.EDIT_PROFILE_SUCCESS: {
            return state.withMutations(state => {
                state.set('user', new User(action.payload));
                state.set('isUpdating', false);
            });
        }

        case AuthActionConstants.DELETE_PROFILE_SUCCESS: {
            return state.set('isDeleting', false);
        }

		case AuthActionConstants.GET_PROFILE_SUCCESS: {
            return state.withMutations(state => {
                state.set('user', new User(action.payload));
                state.set('isLoading', false);
            });
        }

        case AuthActionConstants.LOG_IN_USER_ERROR: {
            return state.set('validationModel', action.payload)
        }

        case AuthActionConstants.SIGN_UP_USER_ERROR: {
            return state.set('validationModel', action.payload)
        }

        case AuthActionConstants.EDIT_PROFILE_ERROR: {
            return state.set('validationModel', action.payload)
        }

        case AuthActionConstants.DELETE_PROFILE_ERROR: {
            return state.set('isDeleting', false)
        }

        case AuthActionConstants.CHECK_USER_LOGGED_IN: {
            const authToken = localStorage.getItem('auth_token');
            return state.set('isLoggedIn', authToken === null || authToken === '' ? false : true )
        }
        
       default: {
            return state;
        }
    }
};

export default authReducer;