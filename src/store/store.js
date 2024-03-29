import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import globalReducer from './slice';
import rootSaga from './saga';
import propertiesSlice from '../pages/properties/propertiesSlice';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Include all reducers to store
const reducer = combineReducers({
  globalState: globalReducer,
  propertiesState: propertiesSlice
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Start sagas
sagaMiddleware.run(rootSaga);