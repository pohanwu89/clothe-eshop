import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { selectIsCollectionIsLoaded } from '../../redux/shop/shop.selector'
import WithSpinner from '../../components/withSpinner/WithSpinner'
import CollectionPage from './Collection'

const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectIsCollectionIsLoaded(state)
})

const CollectionContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage)

export default CollectionContainer;