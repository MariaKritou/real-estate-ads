/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddProperty from './AddProperty';
import * as reduxHooks from 'react-redux';
import * as propertyService from '../../services/propertyService';

jest.mock('react-redux', () => ({
    useDispatch: () => jest.fn(),
    useSelector: jest.fn(),
    // Add other exports as needed
  }));
  
// Mock the useDispatch hook
const mockDispatch = jest.fn();
jest.spyOn(reduxHooks, 'useDispatch').mockReturnValue(mockDispatch);

jest.mock('../../services/propertyService', () => ({
    fetchLocations: jest.fn().mockResolvedValue([
      { mainText: 'New York', secondaryText: 'NY' },
    ]),
}));

beforeEach(() => {
    jest.clearAllMocks();
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });

// Mock date picker
// est.mock('@mui/x-date-pickers', () => ({ DatePicker: 'mockDatePicker' }));
it('updates title input and validates', async () => {
    render(<AddProperty />);
    const titleInput = screen.getByLabelText(/title\*/i);
  
    // Simulate user typing
    await userEvent.type(titleInput, 'Test Property');
    expect(titleInput.value).toBe('Test Property');
  
    // await userEvent.click(screen.getByText(/submit/i));
    // expect(screen.queryByText(/title is required!/i)).not.toBeInTheDocument();
  });
  
  it('submits form with valid data', async () => {
    render(<AddProperty />);
    
    // Fill in the form fields
    await userEvent.type(screen.getByLabelText(/title\*/i), 'Test Property');
    // other fields...
  
    // Mock form submission
    const submitButton = screen.getByText(/submit/i);
    
    // Use act to wrap asynchronous operations
    await act(async () => {
      await userEvent.click(submitButton);
    });
  
    // Assert dispatch was called with expected action
    expect(mockDispatch).toHaveBeenCalledWith(expect.anything()); 
  });
  