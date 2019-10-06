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
    appId: "1:687607517371:web:227cb0e6b73d26f381199e"
}

firebase.initializeApp(config)

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};



export const auth = firebase.auth();
export const firestore = firebase.firestore();


// set google will always pop up while sign in and auth
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider)
}

export const addCollectionAndDocuments = async(collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    // console.log(collectionRef)

    /* we group the set data call together to make function predictable*/
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
            //tell firebase give us a new doc ref in this collection and generate unique id for us
            const newDocRef = collectionRef.doc();
            //group the data, and create them in DB
            batch.set(newDocRef, obj)
        })
        //fire the batched request by commit method
    return await batch.commit()
}

//we need to tansform the collection snapshot from array to obj, so we can get the real data we want
export const covertCollectionsSnapshotToMap = (collectionsSnapshot) => {
    /*give us the query snapshot of array data*/
    const transformedCollection = collectionsSnapshot.docs.map(docSnapshot => {
        //pull of the props we need from data
        const { title, items } = docSnapshot.data()

        return {
            // encode makes sure that the string it receives could be use as url
            routeName: encodeURI(title.toLowerCase()),
            id: docSnapshot.id,
            title,
            items
        }
        // now we get new 'array' of our data
    })
    return transformedCollection.reduce((acc, collection) => {
        //call the acc(the obj), and set the propety equal to collection title
        //make it to the key of the obj
        /*add new keys in the obj*/
        //assign the obj to its value
        acc[collection.title.toLowerCase()] = collection;
        return acc;
    }, {})
}

export const getCurrentUser = () => {
    // A Promise oriented way fo saga
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe(); // once we get userAuth, we fire unsubsrice
            resolve(userAuth)
        }, reject)
    })
}

export default firebase;