import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  article: [],
  detailArticle: {},
  infografies: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setArticle: (state, action) => {
      state.article = action.payload;
    },
    setDetailArticle: (state, action) => {
      const { slug, data } = action.payload;
      if (!state.detailArticle[slug]){
        state.detailArticle[slug] = {};
      }
      state.detailArticle[slug] = data;
    },
    setInfografies: (state, action) => {
      state.infografies = action.payload;
    },
    cleareData: (state) => {
      state.article = [];
      state.detailArticle = {};
    },
  },
});

export const { setArticle, setInfografies, setDetailArticle, cleareStatusApp } = dataSlice.actions;
export default dataSlice.reducer;
