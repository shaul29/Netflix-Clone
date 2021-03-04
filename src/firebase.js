import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyBp4L-XW_r3_Du4SXT69mDUGEK9bu2zKZI",
  authDomain: "netflix-clone-fba89.firebaseapp.com",
  databaseURL: "https://netflix-clone-fba89-default-rtdb.firebaseio.com",
  projectId: "netflix-clone-fba89",
  storageBucket: "netflix-clone-fba89.appspot.com",
  messagingSenderId: "403501442441",
  appId: "1:403501442441:web:338b897b58ea9f46bb6d58"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;