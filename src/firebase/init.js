// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDbeijSbrySaPwSqZ8V8aCOI4Rpc1AI61I",
  authDomain: "capsule-wardrobe-3181e.firebaseapp.com",
  databaseURL: "https://capsule-wardrobe-3181e.firebaseio.com",
  projectId: "capsule-wardrobe-3181e",
  storageBucket: "capsule-wardrobe-3181e.appspot.com",
  messagingSenderId: "330057348940",
  appId: "1:330057348940:web:331257b09f160492f381e9",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
