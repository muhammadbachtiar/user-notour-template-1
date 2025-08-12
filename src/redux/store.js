import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlices"
import appReducer from "./features/app/appSlices"
import dataReducer from "./features/data/dataSlices"

const store = configureStore({
    reducer: {
      user: userReducer,
      app: appReducer,
      data: dataReducer
    },
  });
  
  export default store;