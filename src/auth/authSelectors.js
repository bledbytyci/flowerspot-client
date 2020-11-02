const getAuth = store => store.get('auth');

const authSelectors = {
    getUser: store => getAuth(store).get('user')
};

export default authSelectors;
