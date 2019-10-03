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

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) {
        return;
    } else {
        //get the queryrefernece (a query is as asking firestore for data/reference (can use CRUD method)is an obj represent the current place  ih the database that we are querying)
        const userRef = firestore.doc(`users/${userAuth.uid}`)
            //use ref.get() to get the data(snapshot) by reference
        const snapShot = await userRef.get()

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

export default firebase;