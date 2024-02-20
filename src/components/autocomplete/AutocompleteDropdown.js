import React, { useState, useEffect, useMemo } from 'react';
import { Autocomplete, Grid, TextField, Typography } from '@mui/material';
import { propertyService } from '../../services/propertyService';
import { debounce } from 'lodash';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function AutocompleteDropdown() {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  // Define the debounced function
  const debouncedSearch = async (query) => {
    if (query.length >= 3) {
      try {
        const response = await propertyService.fetchLocations(query); //
        setOptions(response);
      } catch (error) {
        console.error('Failed to fetch results:', error);
        setOptions([]);
      }
    } else {
      setOptions([]);
    }
  };

  const debouncedMyFunction = useMemo((value) => debounce(debouncedSearch, 1000), [])

  useEffect(() => {

    debouncedMyFunction(inputValue);
    // Since fetchResults is re-created on each render (debounced function),
    // it's not directly added as a dependency to useEffect.
  }, [inputValue]); // Depend on inputValue to trigger the API call

  return (
    <Autocomplete
      freeSolo
      options={options}
      getOptionLabel={(option) => (option.mainText + ", " + option.secondaryText) || ''}
      renderOption={(props, option) => (
        <li {...props}>
          <Grid container alignItems="center">
            <Grid item sx={{ display: 'flex', width: 44 }}>
              <LocationOnIcon sx={{ color: 'text.secondary' }} />
            </Grid>
            <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
              <Typography variant="body2">
                {option.mainText}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {option.secondaryText}
              </Typography>
            </Grid>
          </Grid>
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          margin='normal'
          required
          variant="outlined"
          onChange={(event) => setInputValue(event.target.value)}
        />
      )}
    />
  );
}

export default AutocompleteDropdown;
