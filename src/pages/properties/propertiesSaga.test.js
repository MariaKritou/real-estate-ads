import { testSaga } from 'redux-saga-test-plan';
import { fetchPropertiesRequestSaga } from './propertiesSaga';
import { setProperties } from './propertiesSlice';
import { propertyService } from '../../services/propertyService';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
    success: jest.fn(),
    error: jest.fn(),
  }));

describe('fetchPropertiesRequestSaga', () => {
  it('handles success response correctly', () => {
    const mockResponse = {
      statusCode: 201,
      data: [{ id: 1, title: 'Property 1' }],
      message: 'Properties fetched successfully',
    };

    testSaga(fetchPropertiesRequestSaga)
      .next()
      .call(propertyService.fetchProperties)
      .next(mockResponse)
      .put(setProperties(mockResponse.data))
      .next()
      .call(toast.success, mockResponse.message)
      .next()
      .isDone();

    // Optionally, you can also test if the success toast was called with the correct message
    // This might require spying on `toast.success` depending on your test setup.
  });

  it('handles failure response correctly', () => {
    const mockResponse = {
      statusCode: 400,
      message: 'Error fetching properties',
    };

    testSaga(fetchPropertiesRequestSaga)
      .next()
      .call(propertyService.fetchProperties)
      .next(mockResponse)
      .call(toast.error, mockResponse.message)
      .next()
      .isDone();

    // Test for error toast as well
  });

  it('handles exception thrown', () => {
    const error = new Error('Network failure');

    testSaga(fetchPropertiesRequestSaga)
      .next()
      .throw(error)
      .call(toast.error, 'Properties could not load, please try again later!')
      .next()
      .isDone();

    // Test for error handling on exception
  });
});