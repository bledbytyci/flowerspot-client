import AuthSagas from '../auth/authSagas.js'
import { fork, all } from 'redux-saga/effects';

const sagas = [...AuthSagas];

export default function* rootSaga() {
    yield all([...sagas].map(fork));
}