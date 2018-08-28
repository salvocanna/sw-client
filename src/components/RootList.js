import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import sentenceCase from 'sentence-case';
import { bindActionCreators } from 'redux';
import * as rootsActions from '../actions';
import WithLoading from './WithLoading';

class RootList extends Component {
	render() {
		const { items, onResourceClick } = this.props;

		if (!items)
			return null;

		const firstResource = items[0];
		const columnsSelection = Object.keys(firstResource).slice(0, 3);

		return (
			<div className={'table-data'}>
				<div className={'row mt-2 pb-2'}>
					<div className={'col-md-1 col-12'}>{'#'}</div>
					{columnsSelection
						.map(element => (
							<div className={'col-md-3 col-4'}
								key={element}
							>{sentenceCase(element)}</div>
						))}
					<div className={'col-md-2 col-4'} />
				</div>
				{items.map((value, i) => (
					<div className={'row mt-2 pb-2'}
						key={JSON.stringify(value)}
					>
						<div className={'col-md-1 col-12'}>{i + 1}</div>
						{columnsSelection
							.map((element, column) => (
								<div
									className={'col-md-3 col-4'}
									key={`${value[element]}-${column}`}
									title={value[element]}
								>{value[element]}</div>
							))}
						<div className={'col-md-2 col-12 text-right'}>
							<a href={'#'}
								onClick={onResourceClick.bind(null, value.id)}
							>{'View →'}</a>
						</div>
					</div>
				))}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	...state,
	router: null,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
		...rootsActions,
	}, dispatch),
	dispatch,
});

RootList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object),
	onResourceClick: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithLoading(RootList)));
