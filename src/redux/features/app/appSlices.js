import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  errorMessage: null,
  isError: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setErrorStatus: (state, action) => {
      state.isError = action.payload;
    },
    cleareStatusApp: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const { setErrorMessage, setErrorStatus, setLoading, cleareStatusApp } = appSlice.actions;
export default appSlice.reducer;
