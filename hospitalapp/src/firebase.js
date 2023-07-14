
import { collection,getDocs,getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';


// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAyrg7zVKIilC2ug24wZJqkKaR06kh8OqA",
//   authDomain: "sample-b5a76.firebaseapp.com",
//   databaseURL: "https://sample-b5a76-default-rtdb.firebaseio.com",
//   projectId: "sample-b5a76",
//   storageBucket: "sample-b5a76.appspot.com",
//   messagingSenderId: "594193993063",
//   appId: "1:594193993063:web:45d99f48c2ff9b10a333c2",
//   measurementId: "G-4JCQ0F6KVM"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const firestore = getFirestore(app);

// // Function to add dummy data to Firestore collection
// /*const addDummyData = async () => {
//   try {
//     const dummyData = [
//       {
//         image: "hx_4 1.png",
//         name: "Sample Pokhrel",
//         specialization: "Anesthesiology",
//         qualification: "MBBS, FCPS, FICS (USA)",
//         rating: "4.5",
//       },
//       {
//         image: "hx_4 1.png",
//         name: "John Doe",
//         specialization: "Cardiology",
//         qualification: "MD, FACC",
//         rating: "4.8",
//       },
//       // Add more dummy data objects as needed
//     ];

//     for (const data of dummyData) {
//       await addDoc(collection(firestore, 'doctor'), data);
//     }

//     console.log('Dummy data added successfully!');
//   } catch (error) {
//     console.error('Error adding dummy data:', error);
//   }
// };

// // Function to fetch doctors from Firestore
// const fetchDoctors = async () => {
//   try {
//     const querySnapshot = await getDocs(collection(firestore, 'doctor'));
//     querySnapshot.forEach((doc) => {
//       console.log('Name:', doc.data().name);
//       console.log('Specialization:', doc.data().specialization);
//       console.log('image:', doc.data().image);
//       console.log('qualification:', doc.data().qualification);
//       console.log('rating:', doc.data().rating);
//       // Access other properties as needed
//     });
//   } catch (error) {
//     console.error('Error fetching doctors:', error);
//   }
// };

// // Call the function to add dummy data and fetch doctors
// addDummyData().then(() => {
//   fetchDoctors().then(() => {
//     console.log('Doctors fetched successfully!');
//     // You can perform any additional operations with the fetched data here
//     // For example, update UI, display the data, etc.
//   }).catch((error) => {
//     console.error('Error fetching doctors:', error);
//   });
// }).catch((error) => {
//   console.error('Error adding dummy data:', error);
// });*/
// // Initialize Firebase app

// // Get a Firestore instance
// const db = getFirestore(app);

// // Reference the collection
// const testCollectionRef = collection(db, 'test');

// // Fetch all documents from the collection
// const querySnapshot = await getDocs(testCollectionRef);

// // Initialize an empty array to store the data
// const data = [];

// // Iterate through the documents and extract the data
// querySnapshot.forEach((doc) => {
//   data.push(doc.data());
// });

// // You now have the data in the 'data' array and can use it as needed
// console.log(data);
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoLdKs5wsTB72aKBbpjMpnRHW8_a5toak",
  authDomain: "umbrellacare-d6eb0.firebaseapp.com",
  projectId: "umbrellacare-d6eb0",
  storageBucket: "umbrellacare-d6eb0.appspot.com",
  messagingSenderId: "707329620333",
  appId: "1:707329620333:web:061b14dc190a1ab18d4264",
  measurementId: "G-MB13RQ8YWS"
};
//Function to fetch doctors from Firestore
const fetchDoctors = async () => {
   try {
    const querySnapshot = await getDocs(collection(firestore, 'doctor'));
     querySnapshot.forEach((doc) => {
       console.log('Name:', doc.data().name);
       console.log('Specialization:', doc.data().specialization);
       console.log('image:', doc.data().image);
       console.log('qualification:', doc.data().qualification);
       console.log('rating:', doc.data().rating);
       // Access other properties as needed
     });
   } catch (error) {
     console.error('Error fetching doctors:', error);
   }
 };
fetchDoctors()
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore }; // Exporting firestore as named export
export default app;
