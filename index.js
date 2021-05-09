/**
 * @format
 */
//Requireing firebase admin for firestore user api
// const admin = require('firebase-admin');

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

//User database work also for push notification using admin sdk and cloud messaging
// var serviceAccount = require("./app/nutriguide-chatbot-firebase-adminsdk-7jcv2-1c41cc3e14.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://nutriguide-chatbot-default-rtdb.firebaseio.com"
// });



// Push Notifications
PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});
AppRegistry.registerComponent(appName, () => App);
