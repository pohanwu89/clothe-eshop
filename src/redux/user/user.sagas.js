import { takeLatest, put, all, call } from 'redux-saga/effects'
import userActionTypes, {} from './user.actionTypes'
import { signInSuccess, signInFail, signOutSuccess, signOutFail, signUpSuccess, signUpFail } from './user.actions'
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils'


/*we can pass additionalData to get snapshot because we do recieve it in our createUserProfileDocument method */
export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(
            createUserProfileDocument,
            userAuth,
            additionalData
        );
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
        yield put(signInFail(error));
    }
}

export function* signInWithGoogle() {
    try {
        //we can get the userAuth obj where we can get user data
        const { user } = yield auth.signInWithPopup(googleProvider)
        yield getSnapshotFromUserAuth(user)
    } catch (error) {
        yield put(signInFail(error))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(
        userActionTypes.GOOGLE_SIGN_IN_START,
        signInWithGoogle
    )
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password)
        yield getSnapshotFromUserAuth(user)
    } catch (error) {
        yield put(signInFail(error))
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(
        userActionTypes.EMAIL_SIGN_IN_START,
        signInWithEmail
    )
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser()
        if (!userAuth) {
            return;
        } else yield getSnapshotFromUserAuth(userAuth)
    } catch (error) {
        yield put(signInFail())
    }
}

export function* onCheckUserSession() {
    yield takeLatest(
        userActionTypes.CHECK_USER_SESSION,
        isUserAuthenticated
    )
}

export function* signOut() {
    try {
        yield auth.signOut()
        yield put(signOutSuccess())
    } catch (error) {
        yield put(signOutFail(error))
    }
}

export function* onSignOutStart() {
    yield takeLatest(
        userActionTypes.SIGN_OUT_START,
        signOut
    )
}


export function* signInAfterSignUp({ payload: { user, additionalData } }) {
    yield getSnapshotFromUserAuth(user, additionalData);
}


export function* onSignUpSuccess() {
    yield takeLatest(
        userActionTypes.SIGN_UP_SUCCESS,
        signInAfterSignUp
    )
}

export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ user, additionalData: { displayName } }));
    } catch (error) {
        yield put(signUpFail(error));
    }
}

export function* onSignUpStart() {
    yield takeLatest(
        userActionTypes.SIGN_UP_START,
        signUp
    )
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(isUserAuthenticated),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}