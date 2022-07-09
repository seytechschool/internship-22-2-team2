const prodConfig = {
  
    apiKey: "AIzaSyAiW0juurABzfesp39FfCBGzkX1ogPrGhM",
    authDomain: "vlmd-77b18.firebaseapp.com",
    projectId: "vlmd-77b18",
    storageBucket: "vlmd-77b18.appspot.com",
    messagingSenderId: "1066128254966",
    appId: "1:1066128254966:web:c1ebc4dd9b69b1e36709d7",
    measurementId: "G-R87MQW7C6M"
  };

const devConfig = {

    apiKey: "AIzaSyAiW0juurABzfesp39FfCBGzkX1ogPrGhM",
    authDomain: "vlmd-77b18.firebaseapp.com",
    projectId: "vlmd-77b18",
    storageBucket: "vlmd-77b18.appspot.com",
    messagingSenderId: "1066128254966",
    appId: "1:1066128254966:web:c1ebc4dd9b69b1e36709d7",
    measurementId: "G-R87MQW7C6M"
  };

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
