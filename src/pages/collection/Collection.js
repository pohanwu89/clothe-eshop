import React from 'react'
import { connect } from 'react-redux'
import CollectionItem from '../../components/collection-item/CollectionItem'
import { createStructuredSelector } from 'reselect'
import { selectCollection } from '../../redux/shop/shop.selector'
import './collection.styles.scss'

const CollectionPage = ({ collection }) => {
  const { items, title } = collection
  return (
    <div className='collection-page'>
      <h2 className='title'> {title}</h2>
      <div className='items'>
        {
          items.map(item =>
            <CollectionItem key={item.id} item={item} />
          )
        }
      </div>
    </div>
  )
}
// we have to use second param in map state to props
const mapStateToProps = (state, ownProps) => ({
  /* selectCollection(ownProps.match.params.collectionId)=>return a createselector call, it takes state to run*/
  collection: selectCollection(ownProps.match.params.collectionId)(state)
})
export default connect(mapStateToProps)(CollectionPage)