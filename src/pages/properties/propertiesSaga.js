import {
    takeLatest, put, call,
} from 'redux-saga/effects';
import { propertyService } from '../../services/propertyService';
import { addProperty, addPropertyRequest, fetchPropertiesRequest, setProperties } from './propertiesSlice';
import { toast } from 'react-toastify';

/**
 * Fetches the properties from the backend and dispatches the properties to the store.
 * Shows toast notifications on success or error
 * @returns {void}
 */
function* fetchPropertiesRequestSaga() {
    try {
        const propertyResponse = yield call(propertyService.fetchProperties);

        if (propertyResponse.statusCode === 201) {
            yield put(setProperties(propertyResponse.data))
            toast.success(propertyResponse.message);
        }
        else{
            toast.error(propertyResponse.message);
        }
    } catch (error) {
        toast.error('Properties could not load, please try again later!');
        console.log('Properties fetch ERROR: ', error)
    }
}

/**
 * Sends a new property to the backend and dispatches the properties to the store if the response is successful.
 * Shows toast notifications on success or error
 * @returns {void}
 */
function* addPropertyRequestSaga(action) {
    try {
        const propertyResponse = yield call(propertyService.addProperty, action.payload.data);

        if (propertyResponse.statusCode === 200) {
            yield put(addProperty(propertyResponse.data))
            action.payload.meta.resolve(); 
            toast.success(propertyResponse.message);
        }
        else{
            toast.error(propertyResponse.message);
        }
    } catch (error) {
        toast.error('Property not saved, please try again later!');
        console.log('Property creation ERROR: ', error)
    }
}

export function* watchPropertySaga() {
    yield takeLatest(fetchPropertiesRequest.type, fetchPropertiesRequestSaga)
    yield takeLatest(addPropertyRequest.type, addPropertyRequestSaga)
}