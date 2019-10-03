import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import CollectionPage from '../collection/Collection'
import CollectionOverview from '../../components/collections-overview/CollectionsOverview'
import { updateCollections } from '../../redux/shop/shop.action'
import { firestore, covertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import WithSpinner from '../../components/withSpinner/WithSpinner'
import axios from 'axios'

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)
class ShopPage extends Component {
  constructor() {
    super()

    this.state = {
      loading: true
    }
  }

  unsubsribeFromSnapShot = null;
  componentDidMount() {
    const { updateCollections } = this.props
    //we get the data use this method, so we can get the snapshot obj of collection
    const collectionRef = firestore.collection('collections')

    // we use.get() to make a api call to get a data(it's a promise so we can use then())
    collectionRef.get().then(
      (async (snapshot) => {
        const collectionsMap = covertCollectionsSnapshotToMap(snapshot)
        updateCollections(collectionsMap)
        this.setState({ loading: false })
      })
    )
  }

  render() {
    /* we can get the access to match because shoppage is rendered by Route */
    const { match } = this.props
    const { loading } = this.state
    console.log(match)
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) =>
            <CollectionOverviewWithSpinner
              {...props}
              isLoading={loading} />}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) =>
            <CollectionPageWithSpinner
              {...props}
              isLoading={loading} />}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
  }
}


export default connect(null, mapDispatchToProps)(ShopPage);