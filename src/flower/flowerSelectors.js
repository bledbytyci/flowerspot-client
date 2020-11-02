const getFlower = store => store.get('flower');

const flowerSelectors = {
    getFlowers: store => getFlower(store).get('flowers')
};

export default flowerSelectors;
