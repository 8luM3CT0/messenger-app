import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyATEGy2DXBchQl-HO30fS65rOkFkSps5Yw",
    authDomain: "imessage-app-2020.firebaseapp.com",
    databaseURL: "https://imessage-app-2020.firebaseio.com",
    projectId: "imessage-app-2020",
    storageBucket: "imessage-app-2020.appspot.com",
    messagingSenderId: "540333532175",
    appId: "1:540333532175:web:ae8b9da739ee5b13c8af7a",
    measurementId: "G-MBQ4JGNV7D"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;