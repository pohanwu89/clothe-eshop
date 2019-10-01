import React from 'react'
import { connect } from 'react-redux'
import { addItem } from '../../redux/cart/cart.actions'
import CustomButton from '../custom-button/CustomButton'
import './collection-item.styles.scss'

const CollectionItem = ({ item, addItem }) => {
  const { imageUrl, price, name } = item
  return (
    <div className="collection-item">
      <div
        className="image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton
        inverted
        onClick={() => addItem(item)} //call addItem and pass the item in
      >
        ADD To Cart
      </CustomButton>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItem
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item) => dispatch(addItem(item))
  }
  // when we call/disparch this function, it receices item as a property and pass it to the action creator
}
export default connect(mapStateToProps, mapDispatchToProps)(CollectionItem);