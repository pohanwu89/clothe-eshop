import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import CollectionContainer from '../collection/CollectionContainer'
import { fetchCollectionsStart } from '../../redux/shop/shop.action'
import CollectionsOverviewContainer from '../../components/collections-overview/CollectionsOverviewContainer'

class ShopPage extends Component {
  // constructor() {
  //   super()

  //   this.state = {
  //     loading: true
  //   }
  // }
  // unsubsribeFromSnapShot = null;
  /*we use redux to fetch data*/

  componentDidMount() {

    const { fetchCollectionsStart } = this.props
    fetchCollectionsStart()

    /* thunk version
        const { fetchCollectionsStartAsync } = this.props
        fetchCollectionsStartAsync()
     */

    /* we use redux to fetch data, so no need the following code*/
    // const { updateCollections } = this.props
    // //we get the data use this method, so we can get the snapshot obj of collection
    // const collectionRef = firestore.collection('collections')

    // // we use.get() to make a api call to get a data(it's a promise so we can use then())
    // collectionRef.get().then(
    //   (async (snapshot) => {
    //     const collectionsMap = covertCollectionsSnapshotToMap(snapshot)
    //     updateCollections(collectionsMap)
    //     this.setState({ loading: false })
    //   })
    // )

    /* **** because componentDidMount() is called after the initial render method,  and pass false to the isLoading of spinner, so it will directly to render collection page. so we should make a new selector to check if data is actaully loaded.   */
  }
  render() {
    /* we can get the access to match because shoppage is rendered by Route */
    const { match } = this.props
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionContainer}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
    // fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
  }
}


export default connect(null, mapDispatchToProps)(ShopPage);