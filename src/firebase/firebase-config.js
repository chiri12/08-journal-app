
import { initializeApp} from "firebase/app";
//import 'firebase/firestore';
//import 'firebase/auth';
import {  getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB7ERTvQ7UGQboGvl6ajlBVKvo6dW6813E",
  authDomain: "react-app-cursos-30ffc.firebaseapp.com",
  projectId: "react-app-cursos-30ffc",
  storageBucket: "react-app-cursos-30ffc.appspot.com",
  messagingSenderId: "301100585652",
  appId: "1:301100585652:web:1d5d61feff340d26997de1"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
/*const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});*/


const googleAuthProvider = new GoogleAuthProvider();

//await signInWithRedirect(auth, provider);


export {
    db,
    googleAuthProvider,
    app 
}
