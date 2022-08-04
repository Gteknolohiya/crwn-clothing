import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import { 
  getFirestore,
  doc,
  getDoc,
  setDoc
 } from 'firebase/firestore';

 // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBtmGYR_oCZCyUis8qAr824Z5spZD7uv3o",
    authDomain: "crwn-clothing-db-64535.firebaseapp.com",
    projectId: "crwn-clothing-db-64535",
    storageBucket: "crwn-clothing-db-64535.appspot.com",
    messagingSenderId: "469103875518",
    appId: "1:469103875518:web:b60c9b58bbe317e86395ef"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  // Create user data from Auth
  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);   
  
    console.log(userDocRef);
    const userSnapshot = getDoc(userDocRef);
    console.log((await userSnapshot).exists());

    // if user data exists
    if(!(await userSnapshot).exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }

    // if user data exists
    return userDocRef;
  }