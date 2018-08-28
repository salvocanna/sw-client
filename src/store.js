/* eslint-disable no-underscore-dangle,global-require */
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'reducers';
import { applyMiddleware, compose, createStore } from 'redux';
const sagaMiddleware = createSagaMiddleware();

export default () => {
	// eslint-disable-next-line no-undef
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const store = createStore(
		rootReducer,
		composeEnhancers(applyMiddleware(sagaMiddleware)),
	);

	store.runSaga = sagaMiddleware.run;

	return store;
};
/* eslint-enable */
