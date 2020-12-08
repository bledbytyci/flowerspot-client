const getFlower = store => store.get('flower');

const flowerSelectors = {
    getFlowers: store => getFlower(store).get('flowers'),
    getFlower: store => getFlower(store).get('flower'),
    getValidationModel: store => getFlower(store).get('validationModel'),
    isCreating: store => getFlower(store).get('isCreating'),
    isUpdating: store => getFlower(store).get('isUpdating'),
    isLoading: store => getFlower(store).get('isLoading'),
    isLoadingFlowers: store => getFlower(store).get('isLoadingFlowers'),
    isMarkedAsFavorite: store => getFlower(store).get('isMarkedAsFavorite')
};

export default flowerSelectors;
