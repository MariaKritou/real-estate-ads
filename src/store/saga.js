import { all, fork } from 'redux-saga/effects'
import { watchPropertySaga } from '../pages/properties/propertiesSaga';

/**
 * The rootSaga is the entry point of all sagas in the application.
 * It starts all the sagas using the fork effect.
 */
export default function* rootSaga() {
  yield all([
    watchPropertySaga,
    // more sagas from different files
  ].map(fork));
}