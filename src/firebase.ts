import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyD0H1irw_kEQZJOde2CoQuNkAJBp6JiTTw",
    authDomain: "contact-list-161d6.firebaseapp.com",
    projectId: "contact-list-161d6",
    storageBucket: "contact-list-161d6.appspot.com",
    messagingSenderId: "1073191958768",
    appId: "1:1073191958768:web:e7d2ed278b0f41109e6a35"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
