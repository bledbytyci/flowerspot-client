const getAuth = store => store.get('auth');

const authSelectors = {
    getUser: store => getAuth(store).get('user'),
    getValidationModel: store => getAuth(store).get('validationModel'),
    isCreating: store => getAuth(store).get('isCreating'),
    isLoggedIn: store => getAuth(store).get('isLoggedIn')
};

export default authSelectors;
