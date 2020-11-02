import Flower from './flower';
import FlowerActionConstants from './flowerActionConstants';
import { List, Map } from 'immutable';

const initialState = Map({
    flowers: List()
});

const flowerReducer = (state = initialState, action) => {
    switch (action.type) {
        case FlowerActionConstants.GET_FLOWERS_SUCCESS: {
            return state.set('flowers', List(Flower.mapFromApiList(action.payload)));
        }
       default: {
            return state;
        }
    }
};

export default flowerReducer;