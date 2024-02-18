import { all, fork } from 'redux-saga/effects'
// import { watchAuthSaga } from '../features/loginComponent/authSaga';

export default function* rootSaga() {
  yield all([
    // watchAuthSaga,
    // more sagas from different files
  ].map(fork));
}