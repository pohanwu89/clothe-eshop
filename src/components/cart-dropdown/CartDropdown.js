import React from 'react'
import { connect } from 'react-redux'
import CartItem from '../cart-item/CartItem'
import CustomButton from '../custom-button/CustomButton'
import './cart-dropdown.styles.scss'

const CartDropdown = ({ cartItems }) => {
  return (
    <div className="cart-dropdown">
      <div className='cart-items'>
        {
          cartItems.map((cartItem) =>
            <CartItem
              key={cartItem.id}
              item={cartItem}
            />
          )
        }
      </div>
      <CustomButton>
        Go to Check out
        </CustomButton>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems
  }
}

export default connect(mapStateToProps)(CartDropdown);