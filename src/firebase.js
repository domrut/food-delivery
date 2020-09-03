import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDNXeWpkgrdQMJZyNRioLdvsz4cFBsVnqM",
    authDomain: "food-delivery-app-5d5eb.firebaseapp.com",
    databaseURL: "https://food-delivery-app-5d5eb.firebaseio.com",
    projectId: "food-delivery-app-5d5eb",
    storageBucket: "food-delivery-app-5d5eb.appspot.com",
    messagingSenderId: "331272158660",
    appId: "1:331272158660:web:d39a5d84e06768f751f891"
  };

  let fire = firebase.initializeApp(firebaseConfig);

  export default fire;