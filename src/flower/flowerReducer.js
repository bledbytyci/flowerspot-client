import Flower from './flower';
import FlowerActionConstants from './flowerActionConstants';
import { List, Map } from 'immutable';

const initialState = Map({
    flowers: List(),
    isMarkedAsFavorite: false
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
            return state.set('flowers', List(Flower.mapFromFavApiList(action.payload.fav_flowers)));
        }
        case FlowerActionConstants.MARK_FLOWER_FAVORITE: {
            return state.set('isMarkedAsFavorite', true);
        }
        case FlowerActionConstants.MARK_FLOWER_FAVORITE_SUCCESS: {
            return state.set('isMarkedAsFavorite', true);
        }
        case FlowerActionConstants.GET_FAVORITE_FLOWERS_ERROR: {
            return state.set('flowers', List());
        }
        case FlowerActionConstants.GET_FLOWERS_ERROR: {
            return state.set('flowers', List());
        }
        case FlowerActionConstants.GET_FLOWERS_FILTERED_ERROR: {
            return state.set('flowers', List());
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