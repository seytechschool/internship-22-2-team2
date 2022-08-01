/* eslint-disable no-alert */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserData } from './userSlice';

const createVehicleObject = vehicle => {
  return {
    brand: vehicle.brand,
    model: vehicle.model,
    plateNumber: vehicle.plateNumber,
    isAssigned: true,
    vehicleStatus: vehicle.vehicleStatus,
    serviceHistory: {
      cost: 1234,
      address: {
        addressLine1: 'test1',
        city: 'test1',
        province: 'test1',
        country: 'test1',
        postalCode: 'test1'
      }
    },
    fuelHistory: {
      cost: vehicle.fuelCost,
      volume: 123456,
      address: {
        addressLine1: 'test',
        city: 'test',
        province: 'test',
        country: 'test',
        postalCode: 'test'
      }
    },
    mileageHistory: {
      mileage: vehicle.mileageCost,
      address: {
        addressLine1: 'test',
        city: 'test',
        province: 'test',
        country: 'test',
        postalCode: 'test'
      }
    },
    __v: 0
  };
};
const updateVehicleObject = vehicle => {
  return {
    brand: vehicle.brand,
    model: vehicle.model,
    plateNumber: vehicle.plateNumber,
    isAssigned: true,
    vehicleStatus: vehicle.vehicleStatus,
    serviceHistory: {
      cost: 1234,
      address: {
        addressLine1: 'test1',
        city: 'test1',
        province: 'test1',
        country: 'test1',
        postalCode: 'test1'
      }
    },
    fuelHistory: {
      cost: vehicle.fuelCost,
      volume: 123456,
      address: {
        addressLine1: 'test',
        city: 'test',
        province: 'test',
        country: 'test',
        postalCode: 'test'
      }
    },
    mileageHistory: {
      mileage: vehicle.mileageCost,
      address: {
        addressLine1: 'test',
        city: 'test',
        province: 'test',
        country: 'test',
        postalCode: 'test'
      }
    },
    __v: 0
  };
};

export const getVehicles = createAsyncThunk(
  'vehicle-list-app/vehicles/getContacts',
  async (routeParams, { getState }) => {
    routeParams = routeParams || getState().contactsApp.contacts.routeParams;
    const response = await axios.get('https://internship-api-22-2-team2.herokuapp.com/vehicles', {
      params: routeParams
    });
    // const data = await {vehicles : response.data}
    const data = await response.data;
    console.log(data, 'contactSlice data');
    return { data, routeParams };
  }
);

export const addContact = createAsyncThunk(
  'vehicle-list-app/vehicles/addVehicle',
  async (contact, { dispatch, getState }) => {
    const vehicle = createVehicleObject(contact);
    const vehicleStringified = JSON.stringify(vehicle);
    const response = await axios.post(
      'https://internship-api-22-2-team2.herokuapp.com/vehicles/addVehicle',
      vehicleStringified,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
    const data = await response.data;

    return data;
  }
);
export const updateContact = createAsyncThunk(
  'vehicle-list-app/vehicles/updateVehicle',
  async (contact, { dispatch, getState }) => {
    const vehicle = updateVehicleObject(contact);
    const vehicleString = JSON.stringify(vehicle);
    const response = await axios.patch(
      `https://internship-api-22-2-team2.herokuapp.com/vehicles/${contact._id}`, 
      vehicleString,
      console.log('Id is ===>', vehicleString),
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE, PATCH'
        }
      }
    );
    const data = await response.data;
      alert('Updated')
    return data;
  }
);
export const removeContact = createAsyncThunk(
  'vehicle-list-app/vehicles/removeVehicle',
  async (contactId, { dispatch, getState }) => {
    try {
      await axios.delete(`https://internship-api-22-2-team2.herokuapp.com/vehicles/${contactId}`, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
        }
      });
      return contactId;
    } catch (err) {
      return alert(' Not deleted');
    }
  }
);


export const removeContacts = createAsyncThunk(
  'contactsApp/contacts/removeContacts',
  async (contactIds, { dispatch, getState }) => {
    await axios.post('/api/contacts-app/remove-contacts', { contactIds });

    return contactIds;
  }
);

export const toggleStarredContact = createAsyncThunk(
  'contactsApp/contacts/toggleStarredContact',
  async (contactId, { dispatch, getState }) => {
    const response = await axios.post('/api/contacts-app/toggle-starred-contact', { contactId });
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getContacts());

    return data;
  }
);

export const toggleStarredContacts = createAsyncThunk(
  'contactsApp/contacts/toggleStarredContacts',
  async (contactIds, { dispatch, getState }) => {
    const response = await axios.post('/api/contacts-app/toggle-starred-contacts', { contactIds });
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getContacts());

    return data;
  }
);

export const setContactsStarred = createAsyncThunk(
  'contactsApp/contacts/setContactsStarred',
  async (contactIds, { dispatch, getState }) => {
    const response = await axios.post('/api/contacts-app/set-contacts-starred', { contactIds });
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getContacts());

    return data;
  }
);

export const setContactsUnstarred = createAsyncThunk(
  'contactsApp/contacts/setContactsUnstarred',
  async (contactIds, { dispatch, getState }) => {
    const response = await axios.post('/api/contacts-app/set-contacts-unstarred', { contactIds });
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getContacts());

    return data;
  }
);

const contactsAdapter = createEntityAdapter({ selectId: ({ _id }) => _id }); //missed part

export const { selectAll: selectContacts, selectById: selectContactsById } = contactsAdapter.getSelectors(
  state => state.contactsApp.contacts
);

const contactsSlice = createSlice({
  name: 'contactsApp/contacts',
  initialState: contactsAdapter.getInitialState({
    searchText: '',
    routeParams: {},
    contactDialog: {
      type: 'new',
      props: {
        open: false
      },
      data: null
    }
  }),
  reducers: {
    setContactsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: event => ({ payload: event.target.value || '' })
    },
    openNewContactDialog: (state, action) => {
      state.contactDialog = {
        type: 'new',
        props: {
          open: true
        },
        data: null
      };
    },
    closeNewContactDialog: (state, action) => {
      state.contactDialog = {
        type: 'new',
        props: {
          open: false
        },
        data: null
      };
    },
    openEditContactDialog: (state, action) => {
      state.contactDialog = {
        type: 'edit',
        props: {
          open: true
        },
        data: action.payload
      };
    },
    closeEditContactDialog: (state, action) => {
      state.contactDialog = {
        type: 'edit',
        props: {
          open: false
        },
        data: null
      };
    },
    clearInputValue: (state, action) => {
      state.searchText = '';
    },
    setSearchVal: (state, action) => {
      state.searchText = action.payload;
    }
  },
  extraReducers: {
    [updateContact.fulfilled]: contactsAdapter.upsertOne,
    [addContact.fulfilled]: contactsAdapter.addOne,
    // [removeContacts.fulfilled]: (state, action) => contactsAdapter.removeMany(state, action.payload),
    [removeContact.fulfilled]: (state, action) => contactsAdapter.removeOne(state, action.payload),
    [getVehicles.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      contactsAdapter.setAll(state, data);
      state.routeParams = routeParams;
      state.searchText = '';
    }
  }
});

export const {
  setContactsSearchText,
  openNewContactDialog,
  closeNewContactDialog,
  openEditContactDialog,
  closeEditContactDialog,
  clearInputValue,
  setSearchVal
} = contactsSlice.actions;

export default contactsSlice.reducer;
