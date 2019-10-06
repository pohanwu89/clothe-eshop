import React, { Component } from 'react';
import { connect } from 'react-redux'
import './sign-in.styles.scss'
import FormInput from '../form-input/FormInput'
import CustomButton from '../custom-button/CustomButton'
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions'

class Signin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { emailSignInStart } = this.props
    const { email, password } = this.state
    emailSignInStart(email, password)
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value })
  }

  render() {
    const { googleSignInStart } = this.props
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            required
            handleChange={this.handleChange}
            label="email"
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            required
            handleChange={this.handleChange}
            label="password"
          />
          <div className="buttons">
            <CustomButton type="submit">Sign in</CustomButton>
            <CustomButton
              type="button"
              onClick={googleSignInStart}
              isGoogleSignIn
            >
              Sign in with Google
            </CustomButton>
          </div>

        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
    // pass the value as obj
  }

}

export default connect(null, mapDispatchToProps)(Signin);
