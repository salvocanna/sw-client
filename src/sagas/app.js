import * as types from '../constants';
import { selectRoot } from '../actions';
import { fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { isResourceStarred, starResource } from '../helper';

function *selectFirstRoot({ payload }) {
	yield put(selectRoot(Object.keys(payload)[0]));
}

function *callSelectFirstRoot() {
	yield takeLatest(types.FETCH_ROOTS_SUCCESS, selectFirstRoot);
}

function *starResourceToggle({ root, resource }) {
	const isStarred = isResourceStarred(root, resource);

	starResource(root, resource, !isStarred);
}

function *callStarResourceToggle() {
	yield takeEvery(types.STAR_RESOURCE_TOGGLE, starResourceToggle);
}

export default function *rootSaga() {
	yield fork(callSelectFirstRoot);
	yield fork(callStarResourceToggle);
}
