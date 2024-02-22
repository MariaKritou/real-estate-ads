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
      options={options}
      onChange={(event, newValue) => onOptionSelect(newValue)}
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
          label="Search*"
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
