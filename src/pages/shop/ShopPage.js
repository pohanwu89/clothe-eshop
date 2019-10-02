import React from 'react'
import { Route } from 'react-router-dom'
import CollectionPage from '../collection/Collection'
import CollectionOverview from '../../components/collections-overview/CollectionsOverview'

const ShopPage = ({ match }) => {
  /* we can get the access to match because shoppage is rendered by Route */
  console.log(match)
  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionOverview} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
  )
}



export default ShopPage;