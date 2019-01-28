import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import InteractiveTable from './interactive-table'; 
import LikeButton from './like-button';




export default function InteractiveMovieTable(props) {
	function isLiked(_, [movieId, ...others]) {
		const foundMovie = props.movies.find((movie) => movie._id === movieId);
		return foundMovie.liked;
	}
	function getQuantityDescription(numMovies) {
		// assume numMovies is a non-negative int.
		if(numMovies !== 1) return `${numMovies} movies`;
		else return '1 movie';
	}
	
	const { movies: moviesInput, totalNumMoviesMatched, currPageNum, totalNumPages } = props;
	const headings = ['_id', 'Title', 'Genre', 'Stock', 'Rate']; 
	
	const moviesOutput = moviesInput.map(function(movie) {
		return [
			movie._id,
			<Link to={`${props.baseUrl}/${movie._id}`}>{movie.title}</Link>,
			movie.genre.name,
			movie.numberInStock,
			movie.dailyRentalRate
		];
	});
	
	const numberOfMoviesShown= moviesOutput.length;

	const summaryDescription = (
		<p>
			Showing {getQuantityDescription(numberOfMoviesShown)} (out of {getQuantityDescription(totalNumMoviesMatched)})
			from the database. Viewing page {currPageNum} of {totalNumPages}.
		</p>
	);
	
	return (
		<React.Fragment>
			{summaryDescription}
			<InteractiveTable
				headings={headings}
				collectionOfItems={moviesOutput}
				collectionOfInteractiveElements={
					[{
						type: LikeButton,
						handlers: {
							handleLiked: (_, [movieId, ...dontCare]) => props.handleLiked(movieId),
							isLiked: isLiked
						}
					}, {
						type: 'button',
						handlers: { 
							onClick: (_, [movieId, dontCare]) => props.handleDelete(movieId)
						},
						otherProps: { children: 'Delete' }
					}]
				}
			/>
		</React.Fragment>
	);
}


InteractiveMovieTable.propTypes = {
	movies: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			genre: PropTypes.shape({
				_id: PropTypes.string,
				name: PropTypes.string.isRequired
			}).isRequired,
			numberInStock: PropTypes.number.isRequired,
			dailyRentalRate: PropTypes.number.isRequired
		}).isRequired
	),
	handleDelete: PropTypes.func.isRequired,
	handleLiked: PropTypes.func.isRequired,
	totalNumMoviesMatched: PropTypes.number.isRequired,
	currPageNum: PropTypes.number.isRequired,
	totalNumPages: PropTypes.number.isRequired
};