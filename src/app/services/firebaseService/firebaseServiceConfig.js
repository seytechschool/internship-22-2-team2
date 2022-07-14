const prodConfig = {
  apiKey: "AIzaSyAiW0juurABzfesp39FfCBGzkX1ogPrGhM",
  authDomain: "vlmd-77b18.firebaseapp.com",
  projectId: "vlmd-77b18",
  storageBucket: "vlmd-77b18.appspot.com",
  messagingSenderId: "1066128254966",
  appId: "1:1066128254966:web:c1ebc4dd9b69b1e36709d7",
  measurementId: "G-R87MQW7C6M"

  // apiKey: 'AIzaSyAo9XhYAvVgtVynXridFdsg4Qtb0DvgTo0',
  // authDomain: 'emplosoft-2db9f.firebaseapp.com',
  // projectId: 'emplosoft-2db9f',
  // databaseURL: 'https://emplosoft-2db9f-default-rtdb.firebaseio.com',
  // storageBucket: 'emplosoft-2db9f.appspot.com',
  // messagingSenderId: '460039525265',
  // appId: '1:460039525265:web:aec32080d87de88acf0030'
};
const devConfig = {
  apiKey: "AIzaSyAiW0juurABzfesp39FfCBGzkX1ogPrGhM",
  authDomain: "vlmd-77b18.firebaseapp.com",
  projectId: "vlmd-77b18",
  storageBucket: "vlmd-77b18.appspot.com",
  messagingSenderId: "1066128254966",
  appId: "1:1066128254966:web:c1ebc4dd9b69b1e36709d7",
  measurementId: "G-R87MQW7C6M"

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
