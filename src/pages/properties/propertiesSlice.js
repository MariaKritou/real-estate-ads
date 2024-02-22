import { createSlice } from '@reduxjs/toolkit';

const PROPERTIES_SLICE = 'PROPERTIES_SLICE';

export const initialState = {
  properties: [],
};

export const propertiesSlice = createSlice({
  name: PROPERTIES_SLICE,
  initialState,
  reducers: {
    setProperties: (state, action) => {
      state.properties = action.payload;
    },
    addProperty: (state, action) => {
      state.properties = [...state.properties, action.payload]
    },
    fetchPropertiesRequest: () => { },
    addPropertyRequest: () => { },
  },
});

export const {
  setProperties,
  addProperty,
  fetchPropertiesRequest,
  addPropertyRequest,
} = propertiesSlice.actions;

export const propertiesSliceSelector = (state) => state.propertiesState;

export default propertiesSlice.reducer;