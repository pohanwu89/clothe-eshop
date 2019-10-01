import React from 'react'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { connect } from 'react-redux'
import { toggleCartHidden } from '../../redux/cart/cart.actions'
import './cart-icon.styles.scss'

const CartIcon = ({ toggleCartHidden }) => {
  return (
    <div
      className='cart-icon'
      onClick={toggleCartHidden}
    >
      <ShoppingIcon className='shopping-icon' />
      <span className="item-count">0</span>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    hidden: state.cart.hidden
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCartHidden: () => dispatch(toggleCartHidden())
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);