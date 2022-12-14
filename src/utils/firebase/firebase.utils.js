import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
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
  initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  // Create user data from Auth
  export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation
    ) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);   
  
    const userSnapshot = getDoc(userDocRef);
    (await userSnapshot).exists();

    // if user data exists
    if(!(await userSnapshot).exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }

    // if user data exists
    return userDocRef;
  }

  // create user in firestore 
  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  }

  // sign in user using email & pass 
  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
  }

  // function that calls signOut
  export const signOutUser = async () => await signOut(auth);

  // returns back what you ever got in onAuthStateChanged
  export const onAuthStateChangedListener = (callback) => 
  onAuthStateChanged(auth, callback);