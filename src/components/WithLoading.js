import PropTypes from 'prop-types';
import React from 'react';

function WithLoading(Component) {
	// eslint-disable-next-line react/prop-types
	return function WihLoadingComponent({ isLoading, ...props }) {
		if (!isLoading)
			return (<Component {...props} />);

		return (<div className={'loader-image-container'}>
			<div>{'Fetching data ⚡️'}</div>
			<img
				className="loader-image"
				height="120"
				src="/lightsaber_blue.svg"
				alt={'Lightsaber'}
				width="120"
			/>
		</div>);
	};
}

WithLoading.propTypes = {
	isLoading: PropTypes.bool.isRequired,
};

export default WithLoading;
