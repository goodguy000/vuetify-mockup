import firebase from 'firebase/app';
import 'firebase/firestore';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDRvpZyndHE7AQK1fvTVs_GWFCeBopxfMY",
    authDomain: "vuetify-mockup.firebaseapp.com",
    databaseURL: "https://vuetify-mockup.firebaseio.com",
    projectId: "vuetify-mockup",
    storageBucket: "vuetify-mockup.appspot.com",
    messagingSenderId: "632564173615",
    appId: "1:632564173615:web:5d02c9ec589bb5c4"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;