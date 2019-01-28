import React from 'react';
import PropTypes from 'prop-types';

import InteractiveMovieTable from './interactive-movie-table';
import Pagination from './pagination';
import GenreFilter from './genre-filter';
import SortSelector from './sort-selector';
import { filterMovies, movieDocs } from '../helpers/movies';
import { calculateNumberElementsShown } from '../helpers/index';

export default function MovieCollection(props) {

	function returnMoviesShown() {
		const { movies, page, genreIdSelected, querySearch } = props;
		const startingIndexForMovies = (page.active - 1) * page.pageCount;
		const filteredMovies = filterMovies(movies, genreIdSelected, querySearch);
		const numberOfMoviesToShow = calculateNumberElementsShown(filteredMovies, page.active, page.pageCount);
		return filteredMovies.slice(startingIndexForMovies, startingIndexForMovies + numberOfMoviesToShow);
	}
		
	function results() {
		const { url, page, handle, movies, genreIdSelected, querySearch } = props;
		const moviesShown = returnMoviesShown();
		const numberOfMoviesShown = moviesShown.length;
		
		if(numberOfMoviesShown === 0) {
			return <p>There are no movies in the database that match the current selection.</p>;
		}
		
		return (
			<React.Fragment>
				<InteractiveMovieTable
					baseUrl={url}
					movies={moviesShown}
					handleDelete={handle.deleteMovie}
					handleLiked={handle.likeMovie}
					totalNumMoviesMatched={filterMovies(movies, genreIdSelected, querySearch).length}
					currPageNum={page.active}
					totalNumPages={page.total}
				/>
				<Pagination
					currentPage={page.active}
					numOfPages={page.total}
					handlePageChange={handle.changePage}
				/>		
			</React.Fragment>
		);
	}
	
	
	const { movies, sort, querySearch, genreIdSelected = null, handle } = props;
	const numberOfMoviesInDatabase = movies.length;
	const movieColumnNames = movieDocs.map((doc) => doc.name);
	
	if(numberOfMoviesInDatabase > 0) {	
		return (
			<React.Fragment>
				<button onClick={handle.goToAddMovie}>New Movie</button>
				<br />
				<input 
					type="text" 
					placeholder="Search by title of movie"
					value={querySearch}
					onChange={handle.changeQuerySearch}
				/>
				<GenreFilter handleGenreChange={handle.changeGenre} genreIdSelected={genreIdSelected} />
				<SortSelector 
					sortBy={sort.byWhat} 
					sortDirection={sort.whichDirection} 
					handleSortChange={handle.changeSort}
					labels={movieColumnNames}
				/>
				{results()}
			</React.Fragment>
		);
	} else {
		return <p>There are no movies in the database.</p>;
	}
}

MovieCollection.propTypes = {
	movies: PropTypes.array.isRequired,
	url: PropTypes.string.isRequired,
	page: PropTypes.shape({
		active: PropTypes.number.isRequired,
		pageCount: PropTypes.number.isRequired,
		total: PropTypes.number.isRequired
	}).isRequired,
	genreIdSelected: PropTypes.string, // not required because null can be sent as a value
	querySearch: PropTypes.string.isRequired,
	sort: PropTypes.shape({
		byWhat: PropTypes.string.isRequired,
		whichDirection: PropTypes.isRequired
	}).isRequired,
	handle: PropTypes.shape({
		deleteMovie: PropTypes.func.isRequired,
		likeMovie: PropTypes.func.isRequired,
		changePage: PropTypes.func.isRequired,
		goToAddMovie: PropTypes.func.isRequired,
		changeGenre: PropTypes.func.isRequired,
		changeSort: PropTypes.func.isRequired,
		changeQuerySearch: PropTypes.func.isRequired,
	}).isRequired
};