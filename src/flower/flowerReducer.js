import Flower from './flower';
import FlowerActionConstants from './flowerActionConstants';
import { List, Map } from 'immutable';

const initialState = Map({
    flowers: List(),
    flower: new Flower()
});

const flowerReducer = (state = initialState, action) => {
    switch (action.type) {
        case FlowerActionConstants.GET_FLOWERS_SUCCESS: {
            return state.set('flowers', List(Flower.mapFromApiList(action.payload.flowers)));
        }
        case FlowerActionConstants.GET_FLOWERS_FILTERED_SUCCESS: {
            return state.set('flowers', List(Flower.mapFromApiList(action.payload.flowers)));
        }
        case FlowerActionConstants.GET_FAVORITE_FLOWERS_SUCCESS: {
            return state.set('flowers', List(Flower.mapFromApiList(action.payload.flowers)));
        }
        case FlowerActionConstants.MARK_FLOWER_FAVORITE_SUCCESS: {
            return state.set('flower', new Flower(action.payload.flower))
        }
        case FlowerActionConstants.RESET_FLOWERS: {
            return state.set('flowers', List());
        }
        default: {
            return state;
        }
    }
};

export default flowerReducer;