/* eslint-disable testing-library/prefer-find-by */
/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AutocompleteDropdown from './AutocompleteDropdown';

// Assuming lodash debounce is mocked to simplify asynchronous behavior handling
jest.mock('lodash/debounce', () => jest.fn((fn) => fn));

describe('AutocompleteDropdown', () => {
    const mockFetchOptions = jest.fn();
    const mockOnOptionSelect = jest.fn();
    const mockGetOptionLabel = (option) => option.label;
    const mockRenderOption = (props, option) => <li {...props}>{option.label}</li>;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without errors', () => {
        render(
            <AutocompleteDropdown
                onOptionSelect={mockOnOptionSelect}
                fetchOptions={mockFetchOptions}
                getOptionLabel={mockGetOptionLabel}
                renderOption={mockRenderOption}
                label='Location'
            />
        );
        expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    });

    it('debounces input change and fetches options', async () => {
        mockFetchOptions.mockResolvedValue([{ label: 'Option 1' }, { label: 'Option 2' }]);

        render(
            <AutocompleteDropdown
                onOptionSelect={mockOnOptionSelect}
                fetchOptions={mockFetchOptions}
                getOptionLabel={mockGetOptionLabel}
                renderOption={mockRenderOption}
                label='Location'
            />
        );

        // Wrap the user interaction and subsequent state updates in act
        await act(async () => {
            await userEvent.type(screen.getByRole('combobox'), 'Option');
        });

        // waitFor is already wrapped in act
        await waitFor(() => expect(mockFetchOptions).toHaveBeenCalledWith('Option'));
        await waitFor(() => expect(screen.getByText('Option 1')).toBeInTheDocument());
    });

    it('clears options on clear input', async () => {
        render(
            <AutocompleteDropdown
                onOptionSelect={mockOnOptionSelect}
                fetchOptions={mockFetchOptions}
                getOptionLabel={mockGetOptionLabel}
                renderOption={mockRenderOption}
                label='Location'
            />
        );

        await act(async () => {
            await userEvent.type(screen.getByRole('combobox'), 'Option');
            await userEvent.clear(screen.getByRole('combobox'));
        });

        await waitFor(() => expect(screen.queryByText('Option 1')).not.toBeInTheDocument());
    });

    it('displays error text when autocompleteError is true', async () => {
        const { rerender } = render(
            <AutocompleteDropdown
                onOptionSelect={mockOnOptionSelect}
                fetchOptions={mockFetchOptions}
                getOptionLabel={mockGetOptionLabel}
                renderOption={mockRenderOption}
                autocompleteError={false}
                autocompleteErrorText="Error text"
                label='Location'
            />
        );

        // Check that "Error text" is not in the document initially
        // await waitFor(() => expect(screen.queryByText('Error text')).not.toBeInTheDocument());

        rerender(
            <AutocompleteDropdown
                onOptionSelect={mockOnOptionSelect}
                fetchOptions={mockFetchOptions}
                getOptionLabel={mockGetOptionLabel}
                renderOption={mockRenderOption}
                autocompleteError={true}
                autocompleteErrorText="Error text"
            />
        );

        await waitFor(() => expect(screen.getByText('Error text')).toBeInTheDocument());
    });

    it('calls onOptionSelect when an option is selected', async () => {
        mockFetchOptions.mockResolvedValue([{ label: 'Option 1' }, { label: 'Option 2' }]);
        render(
            <AutocompleteDropdown
                onOptionSelect={mockOnOptionSelect}
                fetchOptions={mockFetchOptions}
                getOptionLabel={mockGetOptionLabel}
                renderOption={mockRenderOption}
            />
        );

        await act(async () => {
            await userEvent.type(screen.getByRole('combobox'), 'Option');
        });

        await waitFor(() => expect(screen.getByText('Option 1')).toBeInTheDocument());

        await act(async () => {
            await userEvent.click(screen.getByText('Option 1'));
        });

        expect(mockOnOptionSelect).toHaveBeenCalledWith({ label: 'Option 1' });
    });
});
