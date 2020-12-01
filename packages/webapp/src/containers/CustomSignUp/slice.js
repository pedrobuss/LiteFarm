import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  manualSignUp: false,
};

const manualSignUpSlice = createSlice({
  name: 'manualSignUpReducer',
  initialState,
  reducers: {
    manualSignUpSuccess: (state) => {
      state.manualSignUp = true
    },
  },
});


export const { manualSignUpSuccess } = manualSignUpSlice.actions;
export default manualSignUpSlice.reducer;
export const manualSignUpSelector = (state) => {
    return state.entitiesReducer[manualSignUpSlice.name];
}