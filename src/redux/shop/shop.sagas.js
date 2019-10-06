import { takeLatest, call, put, all } from 'redux-saga/effects'
import { firestore, covertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import { fetchCollectionsSuccess, fetchCollectionsFail } from './shop.action'
import ShopActionTypes from './shop.actionTypes'

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = yield firestore.collection('collections')
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(
            covertCollectionsSnapshotToMap, //the function we want to call
            snapshot //arguments pass to the function 
        );
        // in saga, we use put effect to dispatch actions
        yield put(fetchCollectionsSuccess(collectionsMap))

    } catch (error) {
        yield put(fetchCollectionsFail(error.message))
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    )
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart)
    ])
}