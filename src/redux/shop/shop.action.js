import ShopActionTypes from './shop.actionTypes'

export const updateCollections = (collectionsMap) => {
    return {
        type: ShopActionTypes.UPDATE_COLLECTIONS,
        payload: collectionsMap
    }
}