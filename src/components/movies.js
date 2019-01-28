import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MovieCollection from './movie-collection';
import { filterMovies, movieDocs } from '../helpers/movies';
import * as moviesAPI from '../services/fakeMovieService';
import { sortObjects } from '../helpers/index';
import { sortDirections } from './sort-selector';


export default class Movies extends Component {
	constructor(props) {
		super(props);
		
		const numOfMoviesPerPage = 3;
		
		this.state = {
			movies: [],
			page: {
				pageCount: numOfMoviesPerPage,
				active: 1,
				total: 0
			},
			querySearch: '',
			genreIdSelected: null,
			sort: {
				byWhat: movieDocs[0].name,
				whichDirection: sortDirections.ASC
			}
		}
		
	}
	
	async componentDidMount() {
		try {
			const movies = await moviesAPI.getMovies();
			this.setState(function(state) {
				const { page } = state;
				
				return {
					movies: sortObjects(movies, 'title'),
					page: { ...page, total: Math.ceil(movies.length / page.pageCount) }
				};
			});
		} catch(err) {
			alert('Sorry, the movies cannot be retreived at this time.');
		}
	}
	
	handleDeleteMovie = async (movieId) => {
		try { 
			const deletedMovie = await moviesAPI.deleteMovie(movieId);
			this.setState(function(state, props) {
				const { movies, page, genreIdSelected, querySearch } = state; 
				const updatedMovies = movies.filter((movie) => movie._id !== deletedMovie._id);
				
				const updatedFilteredMovies = filterMovies(updatedMovies, genreIdSelected, querySearch);
				const totalNumOfPages = Math.ceil(updatedFilteredMovies.length / page.pageCount);
				const activePage = page.active > totalNumOfPages ? totalNumOfPages : page.active;
				
				return {
					movies: updatedMovies,
					page: { 
						...page, 
						active: activePage,
						total: totalNumOfPages
					}
				};
			});
		} catch(err) {
			alert('Sorry, this movie was unable to be deleted. Please try again later.');
		}
	}
	
	handleLikedMovie = async (movieId) => {
		
		try {
			let foundMovie = await moviesAPI.getMovie(movieId);
			foundMovie.liked = !foundMovie.liked;
			await moviesAPI.saveMovie(foundMovie);
			
			this.setState(function(state) {
				const movies = [ ...state.movies ];
				let movieIndex = movies.findIndex((movie) => movie._id === movieId); 
				
				movies[movieIndex] = foundMovie;
				return { movies };
			});
		} catch(err) {
			console.log(err);
			alert('Sorry, this movie could not be liked.');
		}
	}
	
	handlePageChange = (e, pageWanted) => {
		e.preventDefault();
		
		this.setState(function(state) {
			return { page: {...state.page, active: pageWanted } }; 
		});
	};
	
	_getPathToProperty(property, objToFindPathFromProperty=movieDocs) {
		const foundProperty = objToFindPathFromProperty.find((doc) => doc.name === property)
		if(foundProperty) {
			return foundProperty.path;
		}
		throw new Error('Received an invalid value for "property"'); 
	}
	

	
	handleSortChange = (sortedBy, sortedDirection, isAscending) => {
		const path = this._getPathToProperty(sortedBy);
		
		this.setState(function(state, props) {
			const { movies, page } = state;
			return {
				movies: sortObjects(movies, path, isAscending),
				sort: {
					byWhat: sortedBy,
					whichDirection: sortedDirection,
				},
				page: {...page, active: page.active > 0 ? 1 : 0 }
			};
		});
	};
	
	_handleFilterChange = (genreIdSelected, querySearch) => {
		this.setState(function(state, props) {
			const { movies, page } = state;
			
			const filteredMovies = filterMovies(movies, genreIdSelected, querySearch);
			const totalNumOfPages = Math.ceil(filteredMovies.length / page.pageCount);
			const activePage = totalNumOfPages > 0 ? 1 : 0;
			
			return {
				page: { 
					...page, 
					active: activePage,
					total: totalNumOfPages
				},
				genreIdSelected,
				querySearch
			};
		}); 
		
	}
	
	handleGenreChange = (genreIdSelected) => {
		const titleStartsWith = '';
		this._handleFilterChange(genreIdSelected, titleStartsWith);
	};
	
	handleQuerySearchChange = (event) => {
		const titleStartsWith = event.target.value;
		const genreIdSelected = null;
		this._handleFilterChange(genreIdSelected, titleStartsWith);
	};
	
	handleGoToAddMovie = () => {
		const { history, url } = this.props;
		history.push(`${url}/new`);
	};
	
	render() {
 		const { movies, sort, querySearch, page, genreIdSelected } = this.state;
		const { url } = this.props;
		
		const handlers = { 
			deleteMovie: this.handleDeleteMovie,
			likeMovie: this.handleLikedMovie,
			changePage: this.handlePageChange,
			goToAddMovie: this.handleGoToAddMovie,
			changeGenre: this.handleGenreChange,
			changeSort: this.handleSortChange,
			changeQuerySearch: this.handleQuerySearchChange
		};

		return (
			<MovieCollection
				page={page}
				genreIdSelected={genreIdSelected}
				querySearch={querySearch}
				movies={movies}
				url={url}
				sort={sort}
				handle={handlers}
			/>
		);
	}
}

Movies.propTypes = {
	url: PropTypes.string.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired
};