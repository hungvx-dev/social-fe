import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers'
import rootSaga from './sagas'

const isPro = process.env.NODE_ENV === 'production'

const composeEnhancers =
  !isPro &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
    : compose

const sagaMiddleware = createSagaMiddleware()

export default (initialState = {}) => {
  const middleware = [sagaMiddleware]
  const enhancers = [applyMiddleware(...middleware)]

  !isPro &&
    window.devToolsExtensions &&
    enhancers.push(window.devToolsExtensions())

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers)
  )
  sagaMiddleware.run(rootSaga)

  return store
}
