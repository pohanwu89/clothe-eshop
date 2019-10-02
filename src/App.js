import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import HomePage from './pages/homepage/homepage'
import ShopPage from './pages/shop/ShopPage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import Header from './components/header/Header'
import { setCurrentUser } from './redux/user/user.actions'
import SigninAndSignup from './pages/signin-and-signup/SigninAndSignup'
import { selectCurrentUser } from './redux/user/user.selector'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import './App.css';


class App extends Component {
  unsubsriceFromAuth = null;

  componentDidMount() {
    //we should close this open subscriprion to avoid memory leak
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          this.props.setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        });

      } else {
        // sign out => userAuth = null
        this.props.setCurrentUser(userAuth)
      }
    })

  }

  componentWillUnmount() {
    //Calling the unsubscribe function when the component is about to unmount is the best way to make sure we don't get any memory leaks in our application related to listeners still being open even if the component that cares about the listener is no longer on the page.
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route
            exact
            path="/signin"
            render={() => this.props.currentUser
              ? (<Redirect to='/' />)
              : (<SigninAndSignup />)} />
          <Route path="/checkout" component={CheckoutPage} />
        </Switch>
      </div>

    )

  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})



const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
