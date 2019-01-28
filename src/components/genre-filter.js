import React from 'react';
import PropTypes from 'prop-types';

import{ getGenres } from '../services/fakeGenreService';

export const ALL_GENRES = 'All Genres'
const genres = [ {name: 'All Genres', _id: null}, ...getGenres() ];


export default function GenreFilter(props) {
	const { genreIdSelected } = props;
	const buttons = genres.map(function(genre) {
		const id = genre._id || '';
		const activeClassName = genre._id === genreIdSelected ? 'active-genre' : null;
		return <button className={activeClassName} key={id} onClick={() => props.handleGenreChange(genre._id)}>{genre.name}</button>;
	});
	return <div>Filter by genre: {buttons}</div>;
}

GenreFilter.propTypes = {
	handleGenreChange: PropTypes.func.isRequired,
	genreIdSelected: PropTypes.string
};