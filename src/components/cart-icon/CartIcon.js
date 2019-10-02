import React from 'react'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { toggleCartHidden } from '../../redux/cart/cart.actions'
import { selectCartItemsCount } from '../../redux/cart/cart.selectors'
import './cart-icon.styles.scss'

const CartIcon = ({ itemCount, toggleCartHidden }) => {
  return (
    <div
      className='cart-icon'
      onClick={toggleCartHidden}
    >
      <ShoppingIcon className='shopping-icon' />
      <span className="item-count">{itemCount}</span>
    </div>
  )
}

const mapStateToProps = createStructuredSelector(
  {
    itemCount: selectCartItemsCount
  }
)
//===> the above is a selector(use the state data to produce new peops), which will cause render even when we get the same cartItems from reducers


const mapDispatchToProps = (dispatch) => {
  return {
    toggleCartHidden: () => dispatch(toggleCartHidden())
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);