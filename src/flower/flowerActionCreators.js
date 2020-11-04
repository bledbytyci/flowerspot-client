import FlowerActionConstants from './flowerActionConstants';

const getFlowers = () => ({
    type: FlowerActionConstants.GET_FLOWERS,
    payload: {}
});

const getFlowersSuccess = flowers => ({
    type: FlowerActionConstants.GET_FLOWERS_SUCCESS,
    payload: flowers
});

const getFlowersError = error => ({
    type: FlowerActionConstants.GET_FLOWERS_ERROR,
    payload: error
});

const getFlowersFiltered = (filter) => ({
    type: FlowerActionConstants.GET_FLOWERS_FILTERED,
    payload: filter
});

const getFlowersFilteredSuccess = flowers => ({
    type: FlowerActionConstants.GET_FLOWERS_FILTERED_SUCCESS,
    payload: flowers
});

const getFlowersFilteredError = error => ({
    type: FlowerActionConstants.GET_FLOWERS_FILTERED_ERROR,
    payload: error
});

export default {
	getFlowers,
	getFlowersSuccess,
    getFlowersError,
    getFlowersFiltered,
    getFlowersFilteredSuccess,
    getFlowersFilteredError
}