import * as types from './constants';

export const fetchRoots = () => ({
	type: types.FETCH_ROOTS,
});

export const fetchRoot = type => ({
	type: types.FETCH_ROOTS,
	payload: type,
});

export const selectRoot = root => ({
	type: types.ROOT_SELECT,
	root,
});

export const selectResource = ({ root, resource }) => ({
	type: types.RESOURCE_SELECT,
	root,
	resource,
});

export const starResourceToggle = ({ root, resource }) => ({
	type: types.STAR_RESOURCE_TOGGLE,
	root,
	resource,
});
