import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDoLdKs5wsTB72aKBbpjMpnRHW8_a5toak",
    authDomain: "umbrellacare-d6eb0.firebaseapp.com",
    projectId: "umbrellacare-d6eb0",
    storageBucket: "umbrellacare-d6eb0.appspot.com",
    messagingSenderId: "707329620333",
    appId: "1:707329620333:web:061b14dc190a1ab18d4264",
    measurementId: "G-MB13RQ8YWS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore }; // Exporting firestore as named export
export default app;
