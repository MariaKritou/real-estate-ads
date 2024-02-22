import { all, fork } from 'redux-saga/effects'
import { watchPropertySaga } from '../pages/properties/propertiesSaga';

export default function* rootSaga() {
  yield all([
    watchPropertySaga,
    // more sagas from different files
  ].map(fork));
}