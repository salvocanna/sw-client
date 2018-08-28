import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import createStore from './store';
import './index.css';
import rootSaga from 'sagas';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';

const store = createStore();

store.runSaga(rootSaga);

const routes = (
	<Provider store={store}>
		<Router>
			<Route
				component={App}
				exact
				path={'/'}
			/>
		</Router>
	</Provider>
);

// eslint-disable-next-line no-undef
ReactDOM.render(routes, document.getElementById('root'));
