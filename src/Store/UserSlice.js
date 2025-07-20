import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BaseUrl from "../data/contants";


const initialState = {
  loading: false,
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: null,
  userMenu: [],
  PhsMenu: [],
  error: null
};



export const loginUser = createAsyncThunk('user/loginUser',
  async({ copyname, username, password }) => {
  console.log(copyname, username, password);
  const encodedCredentials = btoa(`${copyname}:${username}:${password}`).toString('base64');

  const headers = {
    'Authorization': `Basic ${encodedCredentials}`,
    'Content-Type': 'application/json'
  };
  const request = await axios.post(`${BaseUrl}UserAccount/Authentication`, {}, {headers});
  const response = await request.data;
  localStorage.setItem('user', JSON.stringify(response));
  return response;
}
);


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{
    logout : (state) => {
      state.user = null;
      state.userMenu = [];
      state.token = null;
      state.PhsMenu = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
        state.user = null;
        state.token = null ;
        state.error = null; // Corrected from 'user.error' to 'state.error'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('Fulfilled action:', action); // Log the entire action object
        if (action.payload && action.payload.status) {
          state.loading = false;
          state.user = action.payload;
          state.token = action.payload.data.PhsToken ;
          state.userMenu = action.payload.data.UserMenu || [];
          state.PhsMenu = action.payload.data.PhsMenu || [];
          state.error = null;
        } else {
          state.loading = false;
          state.user = null;
          state.token = null ;
          state.error = action.payload ? action.payload.message : 'An error occurred while logging in.';
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null ;
        state.error ='An error occurred check your network connection';
      });
  }
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;


