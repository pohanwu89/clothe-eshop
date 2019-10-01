import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebase.utils'
import { connect } from 'react-redux'
import CartIcon from '../cart-icon/CartIcon'
import CartDropdown from '../cart-dropdown/CartDropdown'
import { ReactComponent as Logo } from '../../assets/crown.svg'
import './header.styles.scss'

const Header = ({ currentUser, hidden }) => {
  return (
    <div className='header'>
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">SHOP</Link>
        <Link className="option" to="/contact">CONTACT</Link>
        {
          currentUser
            ?
            <div
              className="option"
              onClick={() => auth.signOut()}
            >
              Sign Out
            </div>
            :
            <Link className="option" to="/signin">Sign In</Link>
        }
        <CartIcon />
      </div>
      {
        hidden
          ? null
          : <CartDropdown />
      }

    </div>
  )
}

const mapStateToProps = ({ user: { currentUser }/*pull currentUser from user*/, cart: { hidden } /*pull hidden from cart*/ }) => {
  return {
    //write simple code because of advanced descturciotn
    currentUser,
    hidden
  }
}

export default connect(mapStateToProps)(Header);