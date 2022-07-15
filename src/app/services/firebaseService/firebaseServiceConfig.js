const prodConfig = {
  // apiKey: "AIzaSyDaY9Ak5DzDNj4RkWQoKivKz8o8KZZrwQI",
  // authDomain: "team-2-61536.firebaseapp.com",
  // projectId: "team-2-61536",
  // storageBucket: "team-2-61536.appspot.com",
  // messagingSenderId: "781607155451",
  // appId: "1:781607155451:web:4f5a67fea9ebed7e76625e",
  // databaseURL: 'https://team-2-61536-default-rtdb.firebaseio.com/' 
  apiKey: "AIzaSyCCS2IeWBiwX7NbvD8krUgh82e_JskkauQ",
  authDomain: "internship-project-fecde.firebaseapp.com",
  databaseURL: "https://internship-project-fecde-default-rtdb.firebaseio.com",
  projectId: "internship-project-fecde",
  storageBucket: "internship-project-fecde.appspot.com",
  messagingSenderId: "330014806944",
  appId: "1:330014806944:web:faaa9ff14c6b59f5e78ac5",
  measurementId: "G-Z1HZ4FN23S"
  };

const devConfig = {
  // apiKey: "AIzaSyDaY9Ak5DzDNj4RkWQoKivKz8o8KZZrwQI",
  // authDomain: "team-2-61536.firebaseapp.com",
  // projectId: "team-2-61536",
  // storageBucket: "team-2-61536.appspot.com",
  // messagingSenderId: "781607155451",
  // appId: "1:781607155451:web:4f5a67fea9ebed7e76625e",
  // databaseURL: 'https://team-2-61536-default-rtdb.firebaseio.com/'
  apiKey: "AIzaSyCCS2IeWBiwX7NbvD8krUgh82e_JskkauQ",
  authDomain: "internship-project-fecde.firebaseapp.com",
  databaseURL: "https://internship-project-fecde-default-rtdb.firebaseio.com",
  projectId: "internship-project-fecde",
  storageBucket: "internship-project-fecde.appspot.com",
  messagingSenderId: "330014806944",
  appId: "1:330014806944:web:faaa9ff14c6b59f5e78ac5",
  measurementId: "G-Z1HZ4FN23S"
  };

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
