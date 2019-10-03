import React from 'react'
import { Link } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from '../../redux/user/user.selector'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { auth } from '../../firebase/firebase.utils'
import { connect } from 'react-redux'
import CartIcon from '../cart-icon/CartIcon'
import CartDropdown from '../cart-dropdown/CartDropdown'
import { ReactComponent as Logo } from '../../assets/crown.svg'
import { HeaderContainer, LogoContainer, OptionDiv, OptionsContainer, OptionLink } from './header.styles'

const Header = ({ currentUser, hidden }) => {
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer >
        <OptionLink to="/shop">SHOP</OptionLink>
        <OptionLink to="/contact">CONTACT</OptionLink>
        {
          currentUser
            ?
            <OptionDiv
              className="option"
              onClick={() => auth.signOut()}>
              Sign Out
            </OptionDiv>
            :
            <OptionLink to="/signin">Sign In</OptionLink>
        }
        <CartIcon />
      </OptionsContainer>
      {
        hidden
          ? null
          : <CartDropdown />
      }

    </HeaderContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})


// const mapStateToProps = ({ user: { currentUser }/*pull currentUser from user*/, cart: { hidden } /*pull hidden from cart*/ }) => {
//   return {
//     //write simple code because of advanced descturciotn
//     currentUser,
//     hidden
//   }
// }

export default connect(mapStateToProps)(Header);