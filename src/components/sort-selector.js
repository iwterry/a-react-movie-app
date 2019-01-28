import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const sortDirections = {
	ASC: 'ASC',
	DESC: 'DESC'
};


const fieldNames = {
	SORT_BY: 'sortBy',
	SORT_DIRECTION: 'sortDirection'
};
	
export default class SortSelector extends Component {
	handleSortChange = (e) => {
		const { target } = e;
		let sortBy, sortDirection;
		
		if(target.name === fieldNames.SORT_BY) {
			sortBy = target.value;
			sortDirection = this.props.sortDirection
		} else if(target.name === fieldNames.SORT_DIRECTION) {
			sortBy = this.props.sortBy;
			sortDirection = target.value;
		} else {
			throw new Error('Something went wrong');
		}
		
		const isAscending = sortDirection === sortDirections.ASC
		this.props.handleSortChange(sortBy, sortDirection, isAscending);
	}
	
	render() {
		return (
			<div>
				<label>
					Sort by: {' '}
					<select
						style={{marginRight: "1em"}}
						name={fieldNames.SORT_BY}
						value={this.props.sortBy} onChange={this.handleSortChange}
					>
						{ this.props.labels.map(function(label, index) {
							return <option key={index}>{label}</option>;
						})}
					</select>
				</label>
				<span> 
					{ Object.keys(sortDirections).map((sortDirection, index) => {
						return	(
							<label key={index}>
								<input 
									type="radio" 
									name= {fieldNames.SORT_DIRECTION}
									value={sortDirection} 
									checked={this.props.sortDirection.toUpperCase() === sortDirection}
									onChange={this.handleSortChange}
								/>
								{sortDirection}
							</label>
						);
					}) }
				</span>
			</div>
		);
	}	
}

SortSelector.propTypes = {
	sortDirection: PropTypes.oneOf([sortDirections.ASC, sortDirections.DESC]).isRequired,
	sortBy: PropTypes.string.isRequired,
	handleSortChange: PropTypes.func.isRequired
};