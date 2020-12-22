import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCPyjYIQZtwtITB8LDPbtPGn-3-Xl1ERy8",
    authDomain: "messenger-cloa.firebaseapp.com",
    databaseURL: "https://messenger-cloa.firebaseio.com",
    projectId: "messenger-cloa",
    storageBucket: "messenger-cloa.appspot.com",
    messagingSenderId: "400716975780",
    appId: "1:400716975780:web:6c20c478bf8bb6f5e32031",
    measurementId: "G-P9C60QQLJ8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;