import FlowerReducer from '../flower/flowerReducer.js';

const rootReducer = (state, action) => {
    return FlowerReducer(state, action);
};

export default rootReducer;