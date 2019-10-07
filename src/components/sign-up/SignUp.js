import React, { useState } from 'react'
import './sign-up.styles.scss'
import FormInput from '../form-input/FormInput'
import { signUpStart } from '../../redux/user/user.actions'
import { connect } from 'react-redux'
import CustomButton from '../custom-button/CustomButton'



const SignUp = ({ signUpStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const { displayName, email, password, confirmPassword } = userCredentials

  const handeSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    } else {
      signUpStart({ displayName, email, password })
      /* we dont do sign up here anymore because we move it to the saga */
      // try {
      //   const { user } = await auth.createUserWithEmailAndPassword(email, password)
      //   await createUserProfileDocument(user, { displayName })

      //   //clean the form after submitting
      //   this.setState({
      //     displayName: '',
      //     email: '',
      //     password: '',
      //     confirmPassword: ''
      //   })
      // } catch (error) {
      //   console.error(error)
      // }
    }
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value })
  }

  return (
    <div className='sign-up'>
      <h2 className='title'>I don't have an account</h2>
      <span>Sign Up with your email and password</span>
      <form
        className='sign-up-form'
        onSubmit={handeSubmit}
      >
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          handleChange={handleChange}
          label='Display Name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          handleChange={handleChange}
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          handleChange={handleChange}
          label='Password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          handleChange={handleChange}
          label='Confirm Password'
          required
        />
        <CustomButton
          type='sbmit'

        >
          Sign Up
          </CustomButton>
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
  }
}

export default connect(null, mapDispatchToProps)(SignUp)