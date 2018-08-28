import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const StarResource = ({ isStarred, onToggle }) => (
	<div className={classnames({ 'star-resource': true, 'is-starred': isStarred })}>
		<FaStar />{' '}
		{isStarred ? (
			<div>
				{'This resource is in your preferred list 😊'}
				<a href={'#'}
					onClick={onToggle}
				>{'Do you want to remove it?'}</a>
			</div>

		) : (
			<div>
				<a href={'#'}
					onClick={onToggle}
				>{'Hey! Why don\'t you add this resource as preferred?'}</a>
			</div>
		)}

	</div>
);

StarResource.propTypes = {
	isStarred: PropTypes.bool,
	onToggle: PropTypes.func,
};

export default StarResource;
