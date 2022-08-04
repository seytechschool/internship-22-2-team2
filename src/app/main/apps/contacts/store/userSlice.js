import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserData = createAsyncThunk('contactsApp/user/getUserData', async () => {
  const response = await axios.get('https://internship-api-22-2-team2.herokuapp.com/vehicles');
  const data = await response.data;
  return data;
});

const userSlice = createSlice({
  name: 'contactsApp/user',
  initialState: {},
  reducers: {},
  extraReducers: {
    [getUserData.fulfilled]: (state, action) => action.payload
  }
});

export default userSlice.reducer;
