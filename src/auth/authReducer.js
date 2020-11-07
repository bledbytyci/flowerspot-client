import { Map } from 'immutable';
import AuthActionConstants from './authActionConstants';
import User from '../user/user';
import ValidationModel from '../setup/validationModel';

const initialState = Map({
    user: new User(), 
    isCreating: false,
    isLoggedIn: false,
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

        case AuthActionConstants.LOG_IN_USER_SUCCESS: {
            return state.set('isLoggedIn', true);
        }

        case AuthActionConstants.LOG_OUT_USER_SUCCESS: {
            return state.set('isLoggedIn', false);
        }
        
		case AuthActionConstants.SIGN_UP_USER_SUCCESS: {
            return state.set('isCreating', false);
        }
        
		case AuthActionConstants.GET_PROFILE_SUCCESS: {
            return state.set('user', new User(action.payload));
        }

        case AuthActionConstants.LOG_IN_USER_ERROR: {
            return state.set('validationModel', action.payload)
        }

        case AuthActionConstants.SIGN_UP_USER_ERROR: {
            return state.set('validationModel', action.payload)
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