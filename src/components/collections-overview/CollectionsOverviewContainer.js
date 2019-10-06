/* A container is a componet that gets wrapped in all of the higher order component */

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { selectIsCollectionFetching, } from '../../redux/shop/shop.selector'
import WithSpinner from '../withSpinner/WithSpinner'
import CollectionsOverview from './CollectionsOverview'

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
})

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview)

export default CollectionsOverviewContainer;