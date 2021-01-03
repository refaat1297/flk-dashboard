import firebase from 'firebase'
import firestore from  'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDawrBVOtBt7jLwkKrb909ulv1DQJk2LQc",
    authDomain: "flk-dashboard.firebaseapp.com",
    projectId: "flk-dashboard",
    storageBucket: "flk-dashboard.appspot.com",
    messagingSenderId: "433113376959",
    appId: "1:433113376959:web:621a0c80d52e786938be0a",
    measurementId: "G-THM8NW6YP6"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

export default firebaseApp.firestore()
