import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import Properties from './Properties'; // Adjust the import path as necessary
import * as reduxHooks from 'react-redux';
import * as propertiesSlice from './propertiesSlice'; // Adjust the import path as necessary
import { configureStore } from '@reduxjs/toolkit';

// Mock the entire react-redux module
jest.mock('react-redux', () => ({
    useDispatch: () => jest.fn(),
    useSelector: jest.fn()
  }));

// Mock CardProperty component and propertiesSlice as before
jest.mock('../../components/cardProperty/CardProperty', () => () => <div>MockCardProperty</div>);
jest.mock('./propertiesSlice', () => ({
  fetchPropertiesRequest: jest.fn(() => ({ type: 'fetchPropertiesRequest' })),
  propertiesSliceSelector: jest.fn(() => ({ properties: [] })) // Mock implementation as needed
}));

describe('Properties', () => {
  const mockDispatch = jest.fn();
  const initialState = {
    properties: [{ _id: '1', c: 'Property 1' }, { _id: '2', title: 'Property 2' }]
  };
  let store;


  beforeEach(() => {
     // Create a new mock store for each test
     store = configureStore({
        // Use your actual reducer, which should handle the initial state and actions
        reducer: {
          // Assuming propertiesSlice defines a reducer for properties
          properties: propertiesSlice,
        },
        // If you need to set an initial state different from the reducer's default
        preloadedState: {
          properties: [{ _id: '1', title: 'Property 1' }, { _id: '2', title: 'Property 2' }]
        }
      });
  
    jest.spyOn(propertiesSlice, 'fetchPropertiesRequest').mockImplementation(() => ({ type: 'fetchPropertiesRequest' }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders property cards when properties are available', () => {
    render(
      <Provider store={store}>
        <Properties />
      </Provider>
    );

    const cards = screen.getAllByText(/MockCardProperty/i);
    expect(cards).toHaveLength(initialState.properties.length);
  });

  it('dispatches fetchPropertiesRequest action on mount if properties are empty', () => {
    jest.spyOn(reduxHooks, 'useSelector').mockImplementation(() => ({ properties: [] }));

    render(
      <Provider store={store}>
        <Properties />
      </Provider>
    );

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'fetchPropertiesRequest' });
  });
});
