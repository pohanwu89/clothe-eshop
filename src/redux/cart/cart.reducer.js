import { cartActionTypes } from './cart.actionTypes'
import { addItemToCart } from './cart.utils'
const INITIAL_STATE = {
  hidden: true,
  cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      }

    case cartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload) // use the function and payload to make a new state
      }
    default:
      return state
  }
}

export default cartReducer