const firebase = require("firebase");
const firebaseConfig = {
  apiKey: process.env.ApiKey,
  authDomain: process.env.AuthDomain,
  projectId: process.env.ProjectId,
  storageBucket:process.env.StorageBucket,
  messagingSenderId: process.env.MessagingSenderId,
  appId: process.env.AppId,
  measurementId: process.env.MeasurementId
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("Users");
module.exports = User;