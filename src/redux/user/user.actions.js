import userActionTypes from './user.actionTypes'


export const googleSignInStart = () => {
    return {
        type: userActionTypes.GOOGLE_SIGN_IN_START
    }
}

export const signInSuccess = (user) => {
    return {
        type: userActionTypes.SIGN_IN_SUCCESS,
        payload: user
    }
}

export const signInFail = (error) => {
    return {
        type: userActionTypes.SIGN_IN_FAIL,
        payload: error
    }
}

export const emailSignInStart = (emailAndPassword) => {
    return {
        type: userActionTypes.EMAIL_SIGN_IN_START,
        payload: emailAndPassword
    }
}

export const checkUserSession = () => {
    return {
        type: userActionTypes.CHECK_USER_SESSION
    }
}

export const signOutStart = () => {
    return {
        type: userActionTypes.SIGN_OUT_START
    }
}

export const signOutSuccess = () => {
    return {
        type: userActionTypes.SIGN_OUT_SUCCESS
    }
}

export const signOutFail = (error) => {
    return {
        type: userActionTypes.SIGN_OUT_Fail,
        payload: error
    }
}

export const signUpStart = (userCredentials) => {
    return {
        type: userActionTypes.SIGN_UP_START,
        payload: userCredentials
    }
}
export const signUpSuccess = ({ user, additionalData }) => ({
    type: userActionTypes.SIGN_UP_SUCCESS,
    payload: { user, additionalData }
});

export const signUpFail = (error) => {
    return {
        type: userActionTypes.SIGN_UP_FAIL,
        payload: error
    }
}