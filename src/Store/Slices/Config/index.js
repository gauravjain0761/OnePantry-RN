import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isOnboarding: false,
};
const slice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setIsOnboarding: state => {
      state.isOnboarding = true;
    },
  },
});
export const {setIsOnboarding} = slice.actions;
export const selectIsOnboarding = state => state.config?.isOnboarding;
export const configSliceReducer = slice.reducer;
