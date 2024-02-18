import { createSlice } from '@reduxjs/toolkit';

const GLOBAL_SLICE = 'GLOBAL_SLICE';

const initialState = {
  isLoading: false,
};

export const globalSlice = createSlice({
  name: GLOBAL_SLICE,
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
    setLoading,
} = globalSlice.actions;

export const globalSliceSelector = (state) => state.globalState;

export default globalSlice.reducer;