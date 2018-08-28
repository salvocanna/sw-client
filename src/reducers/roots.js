import * as types from '../constants';

import initialState from './initial-state';

export default function roots(state = initialState.roots, action) {
	switch (action.type) {
		case types.FETCH_ROOTS:
			return {
				isLoading: true,
				error: void 0,
			};

		case types.FETCH_ROOTS_FAILURE:
			return {
				isLoading: false,
				error: action.message,
			};

		case types.FETCH_ROOTS_SUCCESS:
			return {
				isLoading: false,
				error: void 0,
				availableRoots: action.payload,
			};

		case types.ROOT_FETCH:
		case types.ROOT_FETCH_PAGINATION:
			return {
				...state,
				isLoadingRoot: true,
				error: void 0,
				rootLoading: {
					...state.rootLoading,
					[action.root]: true,
				},
			};

		case types.ROOT_FETCH_SUCCESS:
			return {
				...state,
				isLoadingRoot: false,
				error: void 0,
				rootData: {
					...state.rootData,
					[action.root]: action.result,
				},
				rootLoading: {
					...state.rootLoading,
					[action.root]: false,
				},
			};

		case types.ROOT_FETCH_FAILED:
			return {
				...state,
				isLoadingRoot: false,
				error: action.message,
			};
		default:
			return state;
	}
}
