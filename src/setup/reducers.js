import FlowerReducers from '../flower/flowerReducer.js';
import AuthReducers from '../auth/authReducer.js';
import { combineReducers } from 'redux-immutable';

const reducers = combineReducers({
    auth: AuthReducers,
    flower: FlowerReducers
});

const rootReducer = (state, action) => {
    return reducers(state, action);
};

export default rootReducer;