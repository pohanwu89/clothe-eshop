import ShopActionTypes from './shop.actionTypes'
import { firestore, covertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'


// redux-thunk allows us to write an action creator that retun a 'function' that gets dispatch, instead of pure action.

export const fetchCollectionsStart = () => {
    return {
        type: ShopActionTypes.FETCH_COLLECTIONS_START,
    }
}

export const fetchCollectionsSuccess = (collectionsMap) => {
    return {
        type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
        payload: collectionsMap
    }
}

export const fetchCollectionsFail = (errorMessage) => {
    return {
        type: ShopActionTypes.FETCH_COLLECTIONS_FAIL,
        payload: errorMessage
    }
}

// first example of using thunk to create an action creator
export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        //1.we get the data use 'collection()' method, so we can get the snapshot obj of collection
        const collectionRef = firestore.collection('collections')

        //2.we dispatch to fetch_start function and switch the state to true
        dispatch(fetchCollectionsStart())

        //3. we use.get() to make a api call to get a data(it's a promise so we can use then())
        //4. after we deal with the data, we dispatch to fetch_succeess action
        //5. if we get error, then we dispatch to fetch_fail action
        collectionRef
            .get()
            .then(
                (async(snapshot) => {
                    const collectionsMap = covertCollectionsSnapshotToMap(snapshot)
                    dispatch(fetchCollectionsSuccess(collectionsMap))
                })
            )
            .catch(
                error => dispatch(fetchCollectionsFail(error.message))
            )
    }
}



// export const updateCollections = (collectionsMap) => {
//     return {
//         type: ShopActionTypes.UPDATE_COLLECTIONS,
//         payload: collectionsMap
//     }
// }