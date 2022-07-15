import firebase from 'firebase/app';
import "firebase/auth"
import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import firebaseService from 'app/services/firebaseService';

// import jwtService from 'app/services/jwtService';
// import { setUserData } from './userSlice';

// export const submitLogin =
//   ({ email, password }) =>
//   async dispatch => {
//     return jwtService
//       .signInWithEmailAndPassword(email, password)
//       .then(user => {
//         dispatch(setUserData(user));

//         return dispatch(loginSuccess());
//       })
//       .catch(errors => {
//         return dispatch(loginError(errors));
//       });
//   };

export const submitLoginWithFireBase =
  ({ email, password }) =>
  async dispatch => {
    if (!firebaseService.auth) {
      console.warn("Firebase Service didn't initialize, check your configuration");

      return () => false;
    }
    console.log(email, "email")
    console.log(password, "password")
    return firebaseService.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        return dispatch(loginSuccess());
      })
      .catch(error => {
        const emailErrorCodes = [
          'auth/email-already-in-use',
          'auth/invalid-email',
          'auth/operation-not-allowed',
          'auth/user-not-found',
          'auth/user-disabled'
        ];
        const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];
        const response = [];

        if (emailErrorCodes.includes(error.code)) {
          response.push({
            type: 'email',
            message: error.message
          });
        }

        if (passwordErrorCodes.includes(error.code)) {
          response.push({
            type: 'password',
            message: error.message
          });
        }

        if (error.code === 'auth/invalid-api-key') {
          dispatch(showMessage({ message: error.message }));
        }

        return dispatch(loginError(response));
      });
  };

export const forgotPasswordFirebase =
  ({ email }) => 
  async dispatch => {
    if (!firebaseService.auth) {
      console.warn("Firebase Service didn't initialize, check your configuration");

      return () => false;
    }
    console.log(email, "FSemail")
    console.log(firebaseService.auth, "firebaseService.auth")

    //  const auth = firebase.auth()
    return firebaseService.auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert('Please check your email...');
        // return dispatch(loginSuccess());
        console.log("hello")
      })
      .catch(error => {
        const emailErrorCodes = [
          'auth/email-already-in-use',
          'auth/invalid-email',
          'auth/operation-not-allowed',
          'auth/user-not-found',
          'auth/user-disabled'
        ];
        // const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];
        const response = [];

        // if (emailErrorCodes.includes(error.code)) {
        //   response.push({
        //     type: 'email',
        //     message: error.message
        //   });
        // }

        // if (passwordErrorCodes.includes(error.code)) {
        //   response.push({
        //     type: 'password',
        //     message: error.message
        //   });
        // }

        // if (error.code === 'auth/invalid-api-key') {
        //   dispatch(showMessage({ message: error.message }));
        // }

        // return dispatch(loginError(response));
      });
  };
// export const ResetPassword =
//   ({ email, password }) =>
//   async dispatch => {
//     if (!firebaseService.auth) {
//       console.warn("Firebase Service didn't initialize, check your configuration");

//       return () => false;
//     }
//     return firebaseService.auth
//       .signInWithEmailAndPassword(email, password)
//       .then(() => {
//         return dispatch(loginSuccess());
//       })
//       .catch(error => {
//         const emailErrorCodes = [
//           'auth/email-already-in-use',
//           'auth/invalid-email',
//           'auth/operation-not-allowed',
//           'auth/user-not-found',
//           'auth/user-disabled'
//         ];
//         const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];
//         const response = [];

//         if (emailErrorCodes.includes(error.code)) {
//           response.push({
//             type: 'email',
//             message: error.message
//           });
//         }

//         if (passwordErrorCodes.includes(error.code)) {
//           response.push({
//             type: 'password',
//             message: error.message
//           });
//         }

//         if (error.code === 'auth/invalid-api-key') {
//           dispatch(showMessage({ message: error.message }));
//         }

//         return dispatch(loginError(response));
//       });
//   };

const initialState = {
  success: false,
  errors: []
};

const loginSlice = createSlice({
  name: 'auth/login',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    loginError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    }
  },
  extraReducers: {}
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;
