import { createSelector } from 'reselect'
/* 
There are 2 types of selector:
1. input: no need to usecreateSelector=> function get whole state and return slice of it
2. output: use input and createSelector to build
*/

const selectCart = state => state.cart

export const selectCartItems = createSelector(
  [selectCart],
  /*collection of input selector*/
  (cart) => cart.cartItems
  /*function return the value we want from the selector*/
)

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
)

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(((accQ, cartItem) =>
      accQ + cartItem.quantity
    ), 0)
)

export const selectCartItemsTotal = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(((accP, cartItem) =>
      accP + cartItem.quantity * cartItem.price
    ), 0)
)