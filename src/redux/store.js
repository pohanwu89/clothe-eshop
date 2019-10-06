import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import { persistStore } from 'redux-persist'
import rootSaga from './root-saga'
// import thunk from 'redux-thunk'


import rootReducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware()

const middlewares = [ /*thunk*/ sagaMiddleware]
    // replace thunk with saga
    //have logger only reachable in dev env
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares))
    // after apply middle ware run, we run the saga, and pass each saga to it
sagaMiddleware.run(rootSaga)
export const persistor = persistStore(store)

export default { store, persistor };