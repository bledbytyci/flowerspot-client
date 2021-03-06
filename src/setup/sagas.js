import AuthSagas from '../auth/authSagas.js';
import FlowerSagas from '../flower/flowerSaga.js'
import { all } from 'redux-saga/effects';

const sagas = [
    ...AuthSagas,
    ...FlowerSagas 
];

export default function* rootSaga() {
    yield all([...sagas]);
}