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

export default {
	getFlowers,
	getFlowersSuccess,
	getFlowersError
}