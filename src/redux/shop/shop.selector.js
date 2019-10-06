import { createSelector } from 'reselect'

// const COLLECTION_ID_MAP = {
//     hats: 1,
//     sneakers: 2,
//     jackets: 3,
//     womens: 4,
//     mens: 5
// }

//we use this id map obj(string value goes to id), can get 
const selectShop = state => state.shop;



export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
    // collections now is obj
)

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections ?
    Object.keys(collections).map(key => collections[key]) : []

    //We should check if collections exsists
    //Then we have to turn collections to array, so we can use array method to render overview component
)

// set selectCollection equal to a function that takes collection id(url param)
export const selectCollection = collectionUrlParam =>
    //the function will return a createselector call
    createSelector(
        [selectCollections],
        collections => collections ?
        collections[collectionUrlParam] : null /*after data normalization*/


        // collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam])
        // The method above takes a lot of time to safe data,  we can use data normalization(store list of data inside of obj instead orfarray)
    )
export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
)

export const selectIsCollectionIsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
    // we will get true if the colleciton is not null
)