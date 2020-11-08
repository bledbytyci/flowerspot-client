import FlowerActionConstants from './flowerActionConstants';

const getFlowers = () => ({
    type: FlowerActionConstants.GET_FLOWERS,
    payload: {}
});

const getFlowersSuccess = flowers => ({
    type: FlowerActionConstants.GET_FLOWERS_SUCCESS,
    payload: flowers
});

const getFlowersFiltered = (filter) => ({
    type: FlowerActionConstants.GET_FLOWERS_FILTERED,
    payload: filter
});

const getFlowersFilteredSuccess = flowers => ({
    type: FlowerActionConstants.GET_FLOWERS_FILTERED_SUCCESS,
    payload: flowers
});

const getFavoriteFlowers = () => ({
    type: FlowerActionConstants.GET_FAVORITE_FLOWERS,
    payload: {}
});

const getFavoriteFlowersSuccess = flowers => ({
    type: FlowerActionConstants.GET_FAVORITE_FLOWERS_SUCCESS,
    payload: flowers
});

const markFlowerFavorite = flower_id => ({
    type: FlowerActionConstants.MARK_FLOWER_FAVORITE,
    payload: flower_id
});

const markFlowerFavoriteSuccess = () => ({
    type: FlowerActionConstants.MARK_FLOWER_FAVORITE,
    payload: {}
});

const resetFlowers = () => ({
    type: FlowerActionConstants.RESET_FLOWERS,
    payload: {}
});

export default {
	getFlowers,
	getFlowersSuccess,
    getFlowersFiltered,
    getFlowersFilteredSuccess,
    getFavoriteFlowers,
    getFavoriteFlowersSuccess,
    markFlowerFavorite,
    markFlowerFavoriteSuccess,
    resetFlowers
}