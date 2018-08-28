import Api from '../api';
import { injectMissingIdentifier } from '../helper';
import store from 'store';
import * as types from '../constants';
import { call, fork, put, select, takeEvery } from 'redux-saga/effects';

const listLoadedRoots = state => Object.keys(state.roots.rootData);
const listAllRoots = state => Object.keys(state.roots.availableRoots);

function *getRoots() {
	try {
		const localValue = store.get('roots');

		if (localValue) {
			yield put({ type: types.FETCH_ROOTS_SUCCESS, payload: localValue });

			return;
		}

		const payload = yield call(Api.getRoots);

		store.set('roots', payload);
		yield put({ type: types.FETCH_ROOTS_SUCCESS, payload });
	} catch (e) {
		yield put({ type: types.FETCH_ROOTS_FAILURE, message: e.message });
	}
}

function *callGetRoots() {
	yield takeEvery(types.FETCH_ROOTS, getRoots);
}

function *rootSelected({ root }) {
	yield put({ type: types.ROOT_FETCH, root });

	const localValue = store.get(`root-${root}`);

	if (localValue) {
		yield put({ type: types.ROOT_FETCH_SUCCESS, root, result: localValue });

		return;
	}

	try {
		const partialResults = [];

		do {
			partialResults.push(yield call(Api.getRoot, root, partialResults.length + 1));

			// We could dispatch ROOT_FETCH_PAGINATION for every result page we fetch
			// and display the user like a progress bar or something..

			// yield put({ type: types.ROOT_FETCH_PAGINATION, payload: {
			// 	root,
			// 	progress: partialResults
			// 		.map(r => r.results)
			// 		.map(r => r.length)
			// 		.reduce((a, b) => a + b),
			// 	total: partialResults[0].count,
			// },
			// });
		} while (partialResults[partialResults.length - 1].next !== null);

		const result = ([].concat.apply([], partialResults.map(r => r.results))).map(injectMissingIdentifier);

		store.set(`root-${root}`, result);
		yield put({ type: types.ROOT_FETCH_SUCCESS, root, result });
	} catch (e) {
		yield put({ type: types.ROOT_FETCH_FAILED, root, message: e.message });
	}
}

function *callRootSelected() {
	yield takeEvery(types.ROOT_SELECT, rootSelected);
}

function *loadMissingRoots() {
	const loadedRoots = yield select(listLoadedRoots);
	const allRoots = yield select(listAllRoots);

	for (const root of allRoots) {
		if (!loadedRoots.includes(root))
			yield fork(rootSelected, { root });
	}
}

// ROOT_FETCH_SUCCESS (triggered by the main root loaded) is gonna trigger this,
// which wil call loadMissingRoots which will load all the missing roots data and resources
// so while the user can navigate the first selected root, all the others are loading in background
function *callLoadMissingRoots() {
	yield takeEvery(types.ROOT_FETCH_SUCCESS, loadMissingRoots);
}

export default function *rootSaga() {
	yield fork(callGetRoots);
	yield fork(callRootSelected);
	yield fork(callLoadMissingRoots);
}
