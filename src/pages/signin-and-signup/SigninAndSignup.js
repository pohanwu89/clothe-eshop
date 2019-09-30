import React from 'react'
import SignIn from '../../components/sign-in/Signin'
import SignUp from '../../components/sign-up/SignUp'
import './sign-in-and-sign-up.styles.scss'

const SigninAndSignup = () => {
  return (
    <div className="sign-in-and-sign-up">
      <SignIn />
      <SignUp />
    </div>
  )
}

export default SigninAndSignup;