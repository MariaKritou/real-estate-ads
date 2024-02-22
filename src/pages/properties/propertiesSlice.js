import { createSlice } from '@reduxjs/toolkit';

const PROPERTIES_SLICE = 'PROPERTIES_SLICE';

const initialState = {
  properties: [],
};

export const propertiesSlice = createSlice({
  name: PROPERTIES_SLICE,
  initialState,
  reducers: {
    addProperty: (state, action) => {
      state.properties = [...state.properties, action.property]
    },
    addPropertyRequest: () => { },
  },
});

export const {
  addProperty,
  addPropertyRequest,
} = propertiesSlice.actions;

export const propertiesSliceSelector = (state) => state.propertiesState;

export default propertiesSlice.reducer;