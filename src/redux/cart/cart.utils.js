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

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === cartItemToRemove.id
  })
  // if we are removing an item exists, we look for the item which have the same id, and filter all the item obj
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) =>
      cartItem.id !== cartItemToRemove.id
    )
  } else {
    // if its the new item to add, we add this item obj to the array and assign it with a Q value to 1
    return cartItems.map(
      cartItem =>
        cartItem.id === cartItemToRemove.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
    )
  }
}