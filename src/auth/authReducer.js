import { Map } from 'immutable';
import AuthActionConstants from './authActionConstants';
import User from '../user/user';

const initialState = Map({
    user: new User()
});

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthActionConstants.SIGN_IN_USER_SUCCESS: {
            return state.set('user', new User(action.payload));
		}
		case AuthActionConstants.SIGN_UP_USER_SUCCESS: {
            return state.set('user', new User(action.payload));
		}
		case AuthActionConstants.GET_PROFILE_SUCCESS: {
            return state.set('user', new User(action.payload));
		}
       default: {
            return state;
        }
    }
};

export default authReducer;