export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === cartItemToAdd.id
  })
  // if we are adding an item exists, we look for the item which have the same id, and copy all the item obj, and update its Q value
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  } else {
    // if its the new item to add, we add this item obj to the array and assign it with a Q value to 1
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
  }
}