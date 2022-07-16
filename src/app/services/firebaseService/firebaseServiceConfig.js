const prodConfig = {
  apiKey: 'AIzaSyDaY9Ak5DzDNj4RkWQoKivKz8o8KZZrwQI',
  authDomain: 'team-2-61536.firebaseapp.com',
  projectId: 'team-2-61536',
  storageBucket: 'team-2-61536.appspot.com',
  messagingSenderId: '781607155451',
  appId: '1:781607155451:web:4f5a67fea9ebed7e76625e',
  databaseURL: 'https://team-2-61536-default-rtdb.firebaseio.com/'
};

const devConfig = {
  apiKey: 'AIzaSyDaY9Ak5DzDNj4RkWQoKivKz8o8KZZrwQI',
  authDomain: 'team-2-61536.firebaseapp.com',
  projectId: 'team-2-61536',
  storageBucket: 'team-2-61536.appspot.com',
  messagingSenderId: '781607155451',
  appId: '1:781607155451:web:4f5a67fea9ebed7e76625e',
  databaseURL: 'https://team-2-61536-default-rtdb.firebaseio.com/'
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
