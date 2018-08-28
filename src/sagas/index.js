import app from './app';
import { fork } from 'redux-saga/effects';
import roots from './roots';

export default function *rootSaga() {
	yield fork(roots);
	yield fork(app);
}
