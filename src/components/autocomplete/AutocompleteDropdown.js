import React, { useState, useEffect, useMemo } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { debounce } from 'lodash';

function AutocompleteDropdown({
  onOptionSelect,
  autocompleteError,
  autocompleteErrorText,
  fetchOptions, // Function for fetching options
  renderOption, // Function for rendering each option
  getOptionLabel, // Function for getting option label
}) {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  // Define the debounced function
  const debouncedSearch = async (query) => {
    if (query.length >= 3) {
      try {
        const response = await fetchOptions(query); // Use the fetchOptions prop
        setOptions(response);
      } catch (error) {
        console.error('Failed to fetch results:', error);
        setOptions([]);
      }
    } else {
      setOptions([]);
    }
  };

  const debouncedMyFunction = useMemo(() => debounce(debouncedSearch, 1000), []);

  useEffect(() => {
    debouncedMyFunction(inputValue);

    // Since fetchResults is re-created on each render (debounced function),
    // it's not directly added as a dependency to useEffect.
  }, [inputValue]); // Depend on inputValue to trigger the API call

  const handleOptionSelect = (newValue) => {
    onOptionSelect(newValue);

    if (newValue === null) {
      setOptions([]);
    }
  }

  return (
    <Autocomplete
      freeSolo
      options={options}
      onChange={(event, newValue) => handleOptionSelect(newValue)}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search*"
          margin='normal'
          variant="outlined"
          onChange={(event) => setInputValue(event.target.value)}
          error={!!autocompleteError}
          helperText={autocompleteErrorText}
        />
      )}
    />
  );
}

export default AutocompleteDropdown;
