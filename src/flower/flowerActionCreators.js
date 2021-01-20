import FlowerActionConstants from './flowerActionConstants';

const createFlower = flower => ({
    type: FlowerActionConstants.CREATE_FLOWER,
    payload: flower
});

const createFlowerSuccess = flower => ({
    type: FlowerActionConstants.CREATE_FLOWER_SUCCESS,
    payload: flower
});

const createFlowerError = error => ({
    type: FlowerActionConstants.CREATE_FLOWER_ERROR,
    payload: error
});

const updateFlower = flower => ({
    type: FlowerActionConstants.UPDATE_FLOWER,
    payload: flower
});

const updateFlowerSuccess = flower => ({
    type: FlowerActionConstants.UPDATE_FLOWER_SUCCESS,
    payload: flower
});

const updateFlowerError = error => ({
    type: FlowerActionConstants.UPDATE_FLOWER_ERROR,
    payload: error
});

const getFlowerById = id => ({
    type: FlowerActionConstants.GET_FLOWER_BY_ID,
    payload: id
});

const getFlowerByIdSuccess = flower => ({
    type: FlowerActionConstants.GET_FLOWER_BY_ID_SUCCESS,
    payload: flower
});

const getFlowerByIdError = () => ({
    type: FlowerActionConstants.GET_FLOWER_BY_ID_ERROR,
    payload: {}
});

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

const getRandomFlowers = () => ({
    type: FlowerActionConstants.GET_RANDOM_FLOWERS,
    payload: {}
});

const getRandomFlowersSuccess = flowers => ({
    type: FlowerActionConstants.GET_RANDOM_FLOWERS_SUCCESS,
    payload: flowers
});

const getRandomFlowersError = () => ({
    type: FlowerActionConstants.GET_RANDOM_FLOWERS_ERROR,
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

const setSightings = flower => ({
    type: FlowerActionConstants.SET_SIGHTNINGS,
    payload: flower
});

const setSightingsSuccess = flower => ({
    type: FlowerActionConstants.SET_SIGHTNINGS_SUCCESS,
    payload: flower
});

const deleteFlower = id => ({
    type: FlowerActionConstants.DELETE_FLOWER,
    payload: id
});


const deleteFlowerSuccess = () => ({
    type: FlowerActionConstants.DELETE_FLOWER_SUCCESS
});

const deleteFlowerError = error => ({
    type: FlowerActionConstants.DELETE_FLOWER_ERROR,
    payload: error
});

const setSightingsError = () => ({
    type: FlowerActionConstants.SET_SIGHTNINGS_ERROR,
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
    createFlower,
    createFlowerSuccess,
    createFlowerError,
    updateFlower,
    updateFlowerError,
    updateFlowerSuccess,
    getRandomFlowers,
    getRandomFlowersSuccess,
    getRandomFlowersError,
    getFlowerById,
    getFlowerByIdSuccess,
    getFlowerByIdError,
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
    setSightings,
    setSightingsSuccess,
    setSightingsError,
    deleteFlower,
    deleteFlowerError,
    deleteFlowerSuccess,
    resetFlowers
}