import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
// Import the AddStoreSlice as addStoreReducer
import addStoreReducer from "./AddStoreSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig ={
  key: 'root',
  version: 1,
  storage,
};

const reducer = combineReducers({
  user : userReducer,
  addStore: addStoreReducer
});

const persistedReducer = persistReducer(persistConfig , reducer);

const store = configureStore({
  
  reducer: persistedReducer
});

export default store;