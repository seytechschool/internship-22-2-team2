import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getWidgets = createAsyncThunk(
  'vehicle-list-app/vehicles/getWidgets',
  async (routeParams, { getState }) => {
    const response = await axios.get('/api/project-dashboard-app/widgets');
    const data = await response.data;

    return data;
  }
);

export const getVehicles = createAsyncThunk(
  'vehicle-list-app/vehicles/getContacts',
  async (routeParams, { getState }) => {
    routeParams = routeParams || getState().contactsApp.contacts.routeParams;
    const response = await axios.get('https://internship-api-22-2-team2.herokuapp.com/vehicles', {
      params: routeParams
    });
    // const data = await {vehicles : response.data}
    const data = await response.data;
    /*    console.log(data, 'contactSlice data'); */
    return { data, routeParams };
  }
);

const widgetsAdapter = createEntityAdapter({});

export const { selectEntities: selectWidgets, selectById: selectWidgetById } = widgetsAdapter.getSelectors(
  state => state.projectDashboardApp.widgets
);

const widgetsSlice = createSlice({
  name: 'projectDashboardApp/widgets',
  initialState: widgetsAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getWidgets.fulfilled]: widgetsAdapter.setAll
  }
});

export default widgetsSlice.reducer;
