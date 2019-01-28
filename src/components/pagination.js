import React from 'react';
import PropTypes from 'prop-types';

export default function Pagination(props) { 
	const { numOfPages, currentPage } = props;
	let pageList = [];
	for(let pageNum = 1; pageNum <= numOfPages; pageNum += 1) {
		let activeClassName = null
		if( pageNum === currentPage ) {
			activeClassName = 'active-page';
		}
		pageList.push(
			<li className="page" key={pageNum}>
				<button className={activeClassName} onClick={(e) => props.handlePageChange(e, pageNum)}>{pageNum}</button>
			</li>
		);
	}
	return (
		<nav>
			<ul className="page-list">
				Page(s):
				{pageList}
			</ul>
		</nav>
	);
}

Pagination.propTypes = {
	numOfPages: PropTypes.number.isRequired,
	handlePageChange: PropTypes.func.isRequired
};