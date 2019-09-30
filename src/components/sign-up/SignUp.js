import React, { PureComponent } from 'react'
import './sign-up.styles.scss'
import FormInput from '../form-input/FormInput'
import CustomButton from '../custom-button/CustomButton'

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

class SignUp extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  handeSubmit = async (e) => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    } else {
      try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password)
        await createUserProfileDocument(user, { displayName })

        //clean the form after submitting
        this.setState({
          displayName: '',
          email: '',
          password: '',
          confirmPassword: ''
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value })
  }

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className='sign-up'>
        <h2 className='title'>I don't have an account</h2>
        <span>Sign Up with your email and password</span>
        <form
          className='sign-up-form'
          onSubmit={this.handeSubmit}
        >
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            handleChange={this.handleChange}
            label='Display Name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            handleChange={this.handleChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            handleChange={this.handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            handleChange={this.handleChange}
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
}

export default SignUp