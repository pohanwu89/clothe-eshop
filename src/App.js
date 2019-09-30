import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage'
import ShopPage from './pages/shop/ShopPage'
import Header from './components/header/Header'
import SigninAndSignup from './pages/signin-and-signup/SigninAndSignup'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: ''
    }
  }
  unsubsriceFromAuth = null;

  componentDidMount() {
    this.unsubsriceFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        });

      } else {
        this.setState({ currentUser: userAuth })
      }
    })

  }

  componentWillUnmount() {
    this.unsubsriceFromAuth();
  }

  render() {
    return (
      <div className='App'>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SigninAndSignup} />
        </Switch>
      </div>

    )

  }
}
export default App;
