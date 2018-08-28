import React, { Component } from 'react';
import { Container, NavItem } from 'reactstrap';
import { Nav, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import sentenceCase from 'sentence-case';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import RootList from './RootList';
import Resource from './Resource';
import PropTypes from 'prop-types';
import { isResourceStarred } from '../helper';

class App extends Component {
	static getNavbarResources(availableRoots) {
		return Object
			.keys(availableRoots)
			.map(e => ({
				key: e,
				name: sentenceCase(e),
			}));
	}

	constructor(props) {
		super(props);

		const { actions: { fetchRoots } } = this.props;

		fetchRoots();
	}

	resourceClick(root, resource) {
		const { actions: { selectResource } } = this.props;

		selectResource({ root, resource });
	}

	getAvailableResourcesMap() {
		const { roots: { rootData } } = this.props;
		const resourcesMap = {};

		if (!rootData)
			return {};

		Object.keys(rootData).forEach(group => {
			const groupMap = {};

			rootData[group].forEach(item => {
				groupMap[item.id] = item.name || item.title;
			});

			resourcesMap[group] = groupMap;
		});

		return resourcesMap;
	}
	starResourceToggle(root, resource) {
		const { actions: { starResourceToggle } } = this.props;

		starResourceToggle({ root, resource });
	}

	renderLoader() {
		const { error } = this.props.roots;

		if (error) {
			return (
				<div className={'mt-5 text-center'}>
					<div>{'😣'}</div>
					<div>{'Seems like we\'re having some trouble fetching the data'}</div>
					<div>{'Some stormtrooper are already on their way to fix the issues'}</div>
					<div>{'Perhaps you could help them? '}{error}</div>
				</div>
			);
		}

		return <div className={'mt-5 text-center'}>{'Fetching some data...'}</div>;
	}

	render() {
		const { roots, app } = this.props;
		const { actions: { selectRoot } } = this.props;
		const { selectedRoot, selectedResource } = app;
		const { isLoading, availableRoots, rootLoading, error, rootData } = roots;

		if (isLoading || error)
			return this.renderLoader();

		const navBar = App.getNavbarResources(availableRoots);
		const resourcesMap = this.getAvailableResourcesMap();
		const resourceBody = selectedResource ? rootData[selectedRoot].find(e => e.id === selectedResource) : null;

		const isReady = selectedRoot && availableRoots && rootLoading && rootLoading[selectedRoot] === false;

		const listValues = rootData && rootData[selectedRoot] ? rootData[selectedRoot] : [];

		return (
			<div className={'App'}>
				<Container className={'pt-3'}>
					<div className={'text-center'}>
						<img alt={'Star wars logo'}
							className={'logo'}
							src={'/logo.png'}
						/>
					</div>

					<div className={'mt-3'}>
						<div className={'Home text-center'}>
							<h1>{'My little Star Wars app 👾'}</h1>
						</div>

						{error ? (
							<div>
								<div>{'Seems like we\'re having some issues at the moment...'}</div>
								<div>{error}</div>
							</div>
						) : null}

						<Nav tabs>
							{navBar.map(item => (
								<NavItem key={item.key}>
									<NavLink
										className={classnames({ active: item.key === selectedRoot })}
										onClick={() => selectRoot(item.key)}
									>
										{item.name}
									</NavLink>
								</NavItem>
							))}
						</Nav>

						<div className={'mt-2 mb-2'}>
							{selectedRoot && !selectedResource ? (
								<RootList
									isLoading={!isReady}
									items={listValues}
									onResourceClick={this.resourceClick.bind(this, selectedRoot)}
								/>
							) : null}

							{selectedResource ? (
								<Resource
									isResourceStarred={isResourceStarred(selectedRoot, selectedResource)}
									onResourceClick={this.resourceClick.bind(this)}
									resource={resourceBody}
									resourcesMap={resourcesMap}
									starResourceToggle={this.starResourceToggle.bind(this, selectedRoot, selectedResource)}
								/>
							) : null}
						</div>
					</div>
				</Container>
			</div>
		);
	}
}

App.propTypes = {
	actions: PropTypes.objectOf(PropTypes.func),
	app: PropTypes.object,
	roots: PropTypes.object,
};

const mapStateToProps = state => ({
	roots: state.roots,
	app: state.app,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
		...actions,
	}, dispatch),
	dispatch,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
