import React from 'react'

import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100 //because strip use cents
  const publishableKey = 'pk_test_Rlr3OxWrU6rN0zyPx5D82GKR00KaDsVe7o'

  const onToken = token => {
    console.log(token)
    alert('Payment Successful')
  }
  return (
    <StripeCheckout
      label='Pay Now'
      name='Clothin E Shop'
      billingAddress
      shippingAddress
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is ${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken} // a callback on success
      stripeKey={publishableKey}

    />
  )
}

export default StripeCheckoutButton;