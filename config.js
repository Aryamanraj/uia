const firebase = require("firebase-admin");
const firebaseConfig = {
    apiKey: "AIzaSyBebINXV7S6yPcdj9ylII00jIXn_CFqLlw",
    authDomain: "test2-d93e8.firebaseapp.com",
    projectId: "test2-d93e8",
    storageBucket: "test2-d93e8.appspot.com",
    messagingSenderId: "887120374834",
    appId: "1:887120374834:web:200565194ca9623d4c202b",
    measurementId: "G-Z3R4EXFG32"
  };
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const User = db.collection("Users")
module.exports = User;