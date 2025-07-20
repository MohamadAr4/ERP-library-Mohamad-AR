import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const initialState = {
  loading: false,
  addStore : null ,
  error: null
};

export const AddNewStoreTable = createAsyncThunk('user/addNewStore',
  async({data}) => {
  const PhToken = useSelector((state) => state.user.user.data.PhsToken);
  const headers = {
    "Authorization": `Bearer ${PhToken}`,
    'Content-Type': 'application/json'
  };
  const request = await axios.post('http://localhost:9090/smb/api/UC/Str/Stores/New', {data}, {headers});
  const response = await request.data;
  localStorage.setItem('AddStore', JSON.stringify(response));
  return response;
}
);


const AddStoreSlice = createSlice({
  name: 'AddStore',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(AddNewStoreTable.pending, (state, action) => {
        state.loading = true;
        state.addStore = null;
        state.error = null; // Corrected from 'user.error' to 'state.error'
      })
      .addCase(AddNewStoreTable.fulfilled, (state, action) => {
        console.log('Fulfilled action:', action); // Log the entire action object
        if (action.payload && action.payload.status) {
          state.loading = false;
          state.addStore = action.payload;
          state.error = null;
        } else {
          state.loading = false;
          state.addStore = null;
          state.error = action.payload ? action.payload.message : 'An error occurred while logging in.';
        }
      })
      .addCase(AddNewStoreTable.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error ='An error occurred check your network connection';
      });
  }
});

export default AddStoreSlice.reducer;