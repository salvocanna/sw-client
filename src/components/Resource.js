import sentenceCase from 'sentence-case';
import { getStructureIdentifier } from '../helper';
import { Table } from 'reactstrap';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import StarResource from './StarResource';

const dateRegex = /^\d{4}([-])\d{2}-\d{2}.*$/;

class Resource extends Component {
	getLinkToResource(url) {
		const { onResourceClick, resourcesMap } = this.props;
		let friendlyName = url;
		const { root, id } = getStructureIdentifier(url);

		if (resourcesMap[root] && resourcesMap[root][id])
			friendlyName = resourcesMap[root][id];

		return (
			<div key={url}>
				<a href={'#'}
					onClick={onResourceClick.bind(null, root, id)}
				>{friendlyName}</a>
			</div>
		);
	}

	renderRow(key, value) {
		// If it's an array, it's always gonna be array of URLs
		const isArray = value instanceof Array;
		let cellValue = value;

		if (isArray) {
			cellValue = value.map(item => this.getLinkToResource(item));
		} else if (value && value.match) {
			const isDate = value.match(dateRegex);
			const isURL = Boolean(getStructureIdentifier(value));

			if (isURL)
				cellValue = this.getLinkToResource(value);
			else if (isDate)
				cellValue = moment(value, ['YYYY-MM-DD', moment.ISO_8601]).format('DD/MM/YYYY');
		}

		return (
			<tr key={`${key}-${JSON.stringify(value)}`}>
				<td>{sentenceCase(key)}</td>
				<td>{cellValue}</td>
			</tr>
		);
	}

	render() {
		const { resource, starResourceToggle, isResourceStarred } = this.props;
		const keys = Object.keys(resource);

		return (
			<div className={'Home'}>
				<div className={'mt-2 mb-2'}>
					<StarResource
						isStarred={isResourceStarred}
						onToggle={starResourceToggle}
					/>
				</div>

				<Table responsive>
					<thead>
						<tr>
							<th>{'Item'}</th>
							<th>{'Value'}</th>
						</tr>
					</thead>
					<tbody>
						{keys.map(value => this.renderRow(value, resource[value]))}
					</tbody>
				</Table>
			</div>
		);
	}
}

Resource.propTypes = {
	isResourceStarred: PropTypes.bool,
	resource: PropTypes.object,
	resourcesMap: PropTypes.object,
	onResourceClick: PropTypes.func,
	starResourceToggle: PropTypes.func,
};

export default Resource;
