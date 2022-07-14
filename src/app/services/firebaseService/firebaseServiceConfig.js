const prodConfig = {
  apiKey: "AIzaSyDaY9Ak5DzDNj4RkWQoKivKz8o8KZZrwQI",
  authDomain: "team-2-61536.firebaseapp.com",
  projectId: "team-2-61536",
  storageBucket: "team-2-61536.appspot.com",
  messagingSenderId: "781607155451",
  appId: "1:781607155451:web:4f5a67fea9ebed7e76625e",
  databaseURL: 'https://team-2-61536-default-rtdb.firebaseio.com/'
  // apiKey: 'AIzaSyAo9XhYAvVgtVynXridFdsg4Qtb0DvgTo0',
  // authDomain: 'emplosoft-2db9f.firebaseapp.com',
  // projectId: 'emplosoft-2db9f',
  // databaseURL: 'https://emplosoft-2db9f-default-rtdb.firebaseio.com',
  // storageBucket: 'emplosoft-2db9f.appspot.com',
  // messagingSenderId: '460039525265',
  // appId: '1:460039525265:web:aec32080d87de88acf0030'
};
const devConfig = {
  apiKey: "AIzaSyDaY9Ak5DzDNj4RkWQoKivKz8o8KZZrwQI",
  authDomain: "team-2-61536.firebaseapp.com",
  projectId: "team-2-61536",
  storageBucket: "team-2-61536.appspot.com",
  messagingSenderId: "781607155451",
  appId: "1:781607155451:web:4f5a67fea9ebed7e76625e",
  databaseURL: 'https://team-2-61536-default-rtdb.firebaseio.com/'
  // apiKey: 'AIzaSyAo9XhYAvVgtVynXridFdsg4Qtb0DvgTo0',
  // authDomain: 'emplosoft-2db9f.firebaseapp.com',
  // projectId: 'emplosoft-2db9f',
  // databaseURL: 'https://emplosoft-2db9f-default-rtdb.firebaseio.com',
  // storageBucket: 'emplosoft-2db9f.appspot.com',
  // messagingSenderId: '460039525265',
  // appId: '1:460039525265:web:aec32080d87de88acf0030'
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
