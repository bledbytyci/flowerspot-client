import Reducers from './reducers';
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';
import { Map } from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState = Map()) {
    const middlewares = [sagaMiddleware];
    const enhancer = composeEnhancers(applyMiddleware(...middlewares));
    const store = createStore(Reducers, initialState, enhancer);

    sagaMiddleware.run(rootSaga)

    return store;
}
