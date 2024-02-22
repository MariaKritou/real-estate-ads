import {
    takeLatest, put, call,
} from 'redux-saga/effects';
import { propertyService } from '../../services/propertyService';
import { addProperty, addPropertyRequest } from './propertiesSlice';
import { toast } from 'react-toastify';

function* addPropertyRequestSaga(propertyData) {
    try {
        const propertyResponse = yield call(propertyService.addProperty, propertyData);

        if (propertyResponse.statusCde === 200) {
            yield put(addProperty(propertyResponse.data))
            toast.success(propertyResponse.data.message);
        }
        else{
            toast.error(propertyResponse.data.message);
        }
    } catch (error) {
        toast.error('Property not saved, please try again later!');
        console.log('Property creation ERROR: ', error)
    }
}

export function* watchPropertySaga() {
    yield takeLatest(addPropertyRequest.type, addPropertyRequestSaga)
}