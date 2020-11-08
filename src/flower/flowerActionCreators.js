import FlowerActionConstants from './flowerActionConstants';

const getFlowers = () => ({
    type: FlowerActionConstants.GET_FLOWERS,
    payload: {}
});

const getFlowersSuccess = flowers => ({
    type: FlowerActionConstants.GET_FLOWERS_SUCCESS,
    payload: flowers
});

const getFlowersError = () => ({
    type: FlowerActionConstants.GET_FLOWERS_ERROR,
    payload: {}
});

const getFlowersFiltered = (filter) => ({
    type: FlowerActionConstants.GET_FLOWERS_FILTERED,
    payload: filter
});

const getFlowersFilteredSuccess = flowers => ({
    type: FlowerActionConstants.GET_FLOWERS_FILTERED_SUCCESS,
    payload: flowers
});

const getFlowersFilteredError = () => ({
    type: FlowerActionConstants.GET_FLOWERS_FILTERED_ERROR,
    payload: {}
});

const getFavoriteFlowers = () => ({
    type: FlowerActionConstants.GET_FAVORITE_FLOWERS,
    payload: {}
});

const getFavoriteFlowersSuccess = flowers => ({
    type: FlowerActionConstants.GET_FAVORITE_FLOWERS_SUCCESS,
    payload: flowers
});

const getFavoriteFlowersError = () => ({
    type: FlowerActionConstants.GET_FAVORITE_FLOWERS_SUCCESS,
    payload: {}
});

const markFlowerFavorite = id => ({
    type: FlowerActionConstants.MARK_FLOWER_FAVORITE,
    payload: id
});

const markFlowerFavoriteSuccess = () => ({
    type: FlowerActionConstants.MARK_FLOWER_FAVORITE_SUCCESS,
    payload: {}
});

const resetFlowers = () => ({
    type: FlowerActionConstants.RESET_FLOWERS,
    payload: {}
});

export default {
	getFlowers,
    getFlowersSuccess,
    getFlowersError,
    getFlowersFiltered,
    getFlowersFilteredSuccess,
    getFlowersFilteredError,
    getFavoriteFlowers,
    getFavoriteFlowersSuccess,
    getFavoriteFlowersError,
    markFlowerFavorite,
    markFlowerFavoriteSuccess,
    resetFlowers
}