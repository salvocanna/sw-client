import * as types from '../constants';

import initialState from './initial-state';

const app = (state = initialState.app, action) => {
	switch (action.type) {
		case types.ROOT_SELECT:
			return {
				...state,
				selectedRoot: action.root,
				selectedResource: null,
			};

		case types.RESOURCE_SELECT:
			return {
				...state,
				selectedResource: action.resource,
				selectedRoot: action.root || state.root,
			};
		default:
			return state;
	}
};

export default app;
