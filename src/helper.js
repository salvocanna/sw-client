import store from 'store';

const rootResourceRegex = /.*swapi\.co\/api\/([a-z]+)\/([0-9]+)\/?.*$/;

// As our API response doesn't actually gives us back any ids,
// we need to come up with a solution to uniquely identify resources,
// so injectMissingIdentifier returns the resource body with an added ID.
export function injectMissingIdentifier(value) {
	return {
		...value,
		id: getStructureIdentifier(value.url).id,
	};
}

// This function is meant to give you back the root type and the id given the url as input
// Will return `null` if it's unable to parse the data.
export function getStructureIdentifier(url) {
	const match = url.match(rootResourceRegex);

	if (match) {
		return {
			root: match[1],
			// Not a magic number, rather the regex index of the capture group.
			// eslint-disable-next-line no-magic-numbers
			id: match[2],
		};
	}

	return null;
}

// Read the current set of values from the local storage and set them back with the
// updated values.
export function starResource(root, resource, star = true) {
	const stars = store.get('star') || {};

	stars[`${root}/${resource}`] = Boolean(star);
	store.set('star', stars);
}

// Returns a bool given a root and a resource id
export function isResourceStarred(root, resource) {
	const stars = store.get('star') || {};
	const fullKey = `${root}/${resource}`;

	return stars[fullKey] === true;
}
