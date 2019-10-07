import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import HomePage from './pages/homepage/homepage'
import ShopPage from './pages/shop/ShopPage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import Header from './components/header/Header'
import { checkUserSession } from './redux/user/user.actions'
import SigninAndSignup from './pages/signin-and-signup/SigninAndSignup'
import { selectCurrentUser } from './redux/user/user.selector'
import './App.css';


const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession()
  }, [checkUserSession]);
  // componentDidMount() {

  //   checkUserSession()
  //   //   //we should close this open subscriprion to avoid memory leak
  //   //   this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
  //   //     if (userAuth) {
  //   //       const userRef = await createUserProfileDocument(userAuth)

  //   //       userRef.onSnapshot(snapShot => {
  //   //         this.props.setCurrentUser({
  //   //           currentUser: {
  //   //             id: snapShot.id,
  //   //             ...snapShot.data()
  //   //           }
  //   //         })
  //   //       });

  //   //     } else {
  //   //       // sign out => userAuth = null
  //   //       this.props.setCurrentUser(userAuth)
  //   //       //========================================= send shop data to firebase
  //   //       // // destruction the array to get the data we want to save to db
  //   //       // addCollectionAndDocuments('collections', collectionsArray.map(({ title, items }) =>
  //   //       //   ({ title, items })
  //   //       // ))
  //   //       //=========================================
  //   //     }
  //   //   })

  //   // }

  //   // componentWillUnmount() {
  //   //   //Calling the unsubscribe function when the component is about to unmount is the best way to make sure we don't get any memory leaks in our application related to listeners still being open even if the component that cares about the listener is no longer on the page.
  //   //   this.unsubscribeFromAuth();
  // }
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route
          exact
          path="/signin"
          render={() => currentUser
            ? (<Redirect to='/' />)
            : (<SigninAndSignup />)} />
        <Route path="/checkout" component={CheckoutPage} />
      </Switch>
    </div>

  )

}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})
const mapDispatchToProps = dispatch => {
  return {
    checkUserSession: () => dispatch(checkUserSession())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
