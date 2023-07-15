import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get a Firestore instance
const firestore = getFirestore(app);

// Function to fetch doctors from Firestore
const fetchDoctors = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'doctor'));
    querySnapshot.forEach((doc) => {
      console.log('Name:', doc.data().name);
      console.log('Specialization:', doc.data().specialization);
      console.log('Image:', doc.data().image);
      console.log('Qualification:', doc.data().qualification);
      console.log('Rating:', doc.data().rating);
      // Access other properties as needed
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
  }
};

fetchDoctors(); // Call the function to fetch doctors

export { firestore }; // Exporting firestore as named export
export default app;
