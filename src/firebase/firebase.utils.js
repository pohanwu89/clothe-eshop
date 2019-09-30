import firebase from 'firebase/app' //basic keyword
import 'firebase/firebase-firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyB41oyNuZsVMq4XpGSGcNIyfRwQAP9QnTU",
  authDomain: "eshop-db-c1750.firebaseapp.com",
  databaseURL: "https://eshop-db-c1750.firebaseio.com",
  projectId: "eshop-db-c1750",
  storageBucket: "",
  messagingSenderId: "687607517371",
  appId: "1:687607517371:web:227cb0e6b73d26f381199e",
  measurementId: "G-E6XHXF639F"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  } else {
    const userRef = firestore.doc(`users/${userAuth.uid}`) //get the queryrefernece
    const snapShot = await userRef.get()//get the data

    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        // create data from userAuth obj
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message)
      }
    }
    return userRef;
  }
}

firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();


// set google will always pop up while sign in and auth
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider)
}

export default firebase;