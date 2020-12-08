import Flower from './flower';
import FlowerActionConstants from './flowerActionConstants';
import { List, Map } from 'immutable';
import ValidationModel from '../setup/validationModel';

const initialState = Map({
    flower: new Flower(),
    flowers: List(),
    validationModel: new ValidationModel(),
    isMarkedAsFavorite: false,
    isLoading: false,
    isCreating: false,
    isUpdating: false,
    isLoadingFlowers: false,
    isDeleting: false
});

const flowerReducer = (state = initialState, action) => {
    switch (action.type) {
        case FlowerActionConstants.GET_FAVORITE_FLOWERS: {
            return state.set('isLoadingFlowers', true);
        }

        case FlowerActionConstants.GET_FLOWERS: {
            return state.set('isLoadingFlowers', true);
        }
        
        case FlowerActionConstants.GET_FLOWERS_FILTERED: {
            return state.set('isLoadingFlowers', true);
        }
        
        case FlowerActionConstants.GET_FLOWER_BY_ID: {
            return state.set('isLoading', true);
        }
        
        case FlowerActionConstants.CREATE_FLOWER: {
            return state.set('isCreating', true);
        }
        
        case FlowerActionConstants.UPDATE_FLOWER: {
            return state.set('isUpdating', true);
        }
        
        case FlowerActionConstants.GET_FLOWER_BY_ID_SUCCESS: {
            return state.withMutations(state => {
                state.set('flower', new Flower(action.payload));
                state.set('isLoading', false);
            });
        }

        case FlowerActionConstants.GET_FLOWERS_SUCCESS: {
            return state.withMutations(state => {
                state.set('flowers', List(Flower.mapFromApiList(action.payload.flowers)));
                state.set('isLoadingFlowers', false);
            });
        }

        case FlowerActionConstants.GET_FLOWERS_FILTERED_SUCCESS: {
            return state.withMutations(state => {
                state.set('flowers', List(Flower.mapFromApiList(action.payload.flowers)));
                state.set('isLoadingFlowers', false);
            });
        }

        case FlowerActionConstants.GET_FAVORITE_FLOWERS_SUCCESS: {
            return state.withMutations(state => {
                state.set('flowers', List(Flower.mapFromApiList(action.payload.flowers)));
                state.set('isLoadingFlowers', false);
            });
        }

        case FlowerActionConstants.CREATE_FLOWER_SUCCESS: {
            return state.withMutations(state => {
                state.set('flower', new Flower(action.payload));
                state.set('isCreating', false);
            });
        }

        case FlowerActionConstants.MARK_FLOWER_FAVORITE: {
            return state.set('isMarkedAsFavorite', true);
        }
        
        case FlowerActionConstants.MARK_FLOWER_FAVORITE_SUCCESS: {
            return state.set('isMarkedAsFavorite', true);
        }

        case FlowerActionConstants.CREATE_FLOWER_ERROR: {
            return state.withMutations(state => {
                state.set('validationModel', action.payload);
                state.set('isCreating', false);
            })
        }

        case FlowerActionConstants.UPDATE_FLOWER_ERROR: {
            return state.withMutations(state => {
                state.set('validationModel', action.payload);
                state.set('isUpdating', false);
            })
        }

        case FlowerActionConstants.GET_FAVORITE_FLOWERS_ERROR: {
            return state.withMutations(state => {
                state.set('flowers', List());
                state.set('isLoadingFlowers', false);
            });
        }
        case FlowerActionConstants.GET_FLOWERS_ERROR: {
            return state.withMutations(state => {
                state.set('flowers', List());
                state.set('isLoadingFlowers', false);
            });
        }

        case FlowerActionConstants.GET_FLOWERS_FILTERED_ERROR: {
            return state.withMutations(state => {
                state.set('flowers', List());
                state.set('isLoadingFlowers', false);
            });
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