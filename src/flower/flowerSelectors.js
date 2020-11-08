const getFlower = store => store.get('flower');

const flowerSelectors = {
    getFlowers: store => getFlower(store).get('flowers'),
    isMarkedAsFavorite: store => getFlower(store).get('isMarkedAsFavorite')
};

export default flowerSelectors;
