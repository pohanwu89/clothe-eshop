import React from 'react'
import { connect } from 'react-redux'
import CheckoutItem from '..//../components/checkout-item/CheckoutItem'
import { createStructuredSelector } from 'reselect'
import { selectCartItems, selectCartItemsTotal } from '../../redux/cart/cart.selectors'
import StripeButton from '../../components/stripe-button/StripeButton'

import './checkout.styles.scss'

const CheckoutPage = ({ cartIems, total }) => {
  return (
    <div className='checkout-page'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
      {
        cartIems.map(cartItem =>
          <CheckoutItem
            cartItem={cartItem}
            key={cartItem.id}
          />

        )
      }
      <div className="total">
        <span>Total:${total}</span>
      </div>
      <div className='test-warning'>
        *Please use the following test card for payments*
      <br />
        4242 4242 4242 4242 - Exp: 01/20 -CVV :123
      </div>
      <StripeButton price={total} />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  cartIems: selectCartItems,
  total: selectCartItemsTotal
})

export default connect(mapStateToProps)(CheckoutPage);