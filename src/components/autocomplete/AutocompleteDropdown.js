import React, { useState, useEffect, useMemo } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { debounce } from 'lodash';

/**
 * Renders an autocomplete dropdown component with Material UI components.
 *
 * @param {function} onOptionSelect - Callback function that is triggered when an option is selected.
 * @param {boolean} selectedOption - The option the user selected from the options array.
 * @param {boolean} autocompleteError - Indicates whether there is an error in the autocomplete field.
 * @param {string} autocompleteErrorText - Error message to display if there is an error in the autocomplete field.
 * @param {function} fetchOptions - Function for fetching options.
 * @param {function} renderOption - Function for rendering each option.
 * @param {function} getOptionLabel - Function for getting option label.
 * @param {string} label - Label for the autocomplete field.
 */
function AutocompleteDropdown({
  onOptionSelect,
  selectedOption,
  autocompleteError,
  autocompleteErrorText,
  fetchOptions,
  renderOption,
  getOptionLabel,
  label,
}) {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  /**
 * Debounced search function that is triggered when the input value changes.
 * It waits 1 second before calling the fetchOptions function and we use the useMemo to only
 * send the last request to our backend
 * It checks if the input value is longer than 3 characters to call the fetchOptions
 * @param {string} query - Query string entered in the autocomplete field.
 */
  const debouncedSearch = useMemo(() => debounce(async (query) => {
    if (query.length >= 3) {
      try {
        const response = await fetchOptions(query);
        setOptions(response);
      } catch (error) {
        console.error('Failed to fetch results:', error);
        setOptions([]);
      }
    } else {
      setOptions([]);
    }
  }, 1000), [fetchOptions]);

  useEffect(() => {
    debouncedSearch(inputValue);
  }, [inputValue, debouncedSearch]);

  return (
    <Autocomplete
      freeSolo
      clearOnBlur={true}
      options={options}
      value={selectedOption || null}
      onChange={(event, newValue) => {
        onOptionSelect(newValue);
      }}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      onInputChange={(event, newInputValue, reason) => {
        setInputValue(newInputValue);
        if (reason === 'clear') {
          setOptions([]);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          margin="normal"
          variant="outlined"
          error={!!autocompleteError}
          helperText={autocompleteErrorText}
        />
      )}
    />
  );
}

export default AutocompleteDropdown;
