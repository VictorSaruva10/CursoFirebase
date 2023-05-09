import { initializeApp } from 'firebase/app'
import { getFirestore    } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyCbgxZJUNwQtCkjvcvbpBGEX9-nSvBosFE",
    authDomain: "cursofirebase-1582c.firebaseapp.com",
    projectId: "cursofirebase-1582c",
    storageBucket: "cursofirebase-1582c.appspot.com",
    messagingSenderId: "683871891921",
    appId: "1:683871891921:web:d16bf582c627baf36830f0",
    measurementId: "G-EHCRBEHLHE"
  };


  const firebaseApp = initializeApp(firebaseConfig)

  const db = getFirestore(firebaseApp)
  const auth = getAuth(firebaseApp,)

  export { db, auth }