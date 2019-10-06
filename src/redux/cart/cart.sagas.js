import { all, call, takeLatest, put } from 'redux-saga/effects'
import userActionTypes from '../user/user.actionTypes'
import { clearCart } from './cart.actions'

export function* cleatCartOnSignOut() {
    yield put(clearCart())
}

export function* onSignOutSuccess() {
    yield takeLatest(
        userActionTypes.SIGN_OUT_SUCCESS,
        cleatCartOnSignOut
    )
}

export function* cartSagas() {
    yield all([
        call(onSignOutSuccess)
    ])
}