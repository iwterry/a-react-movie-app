export function filterMoviesByGenre(movies, genreIdSelected) {
	// if genre id is null then all movies should be selected
	return movies.filter((movie) => movie.genre._id === genreIdSelected || genreIdSelected === null);
}

export function filterMoviesByTitle(movies, titleStartsWith) {
	return movies.filter(function(movie) {
		const normalizedTitle = movie.title.toLowerCase();
		const normalizedTitleStartsWith = titleStartsWith.toLowerCase()
		return normalizedTitle.startsWith(normalizedTitleStartsWith);
	});
}

export function filterMovies(
	movies,
	genreIdSelected,
	titleStartsWith, 
	genreFilter=filterMoviesByGenre,
	titleFilter=filterMoviesByTitle
) {
	let filteredMovies = genreFilter(movies, genreIdSelected);
	filteredMovies = titleFilter(filteredMovies, titleStartsWith);
	return filteredMovies
}

export const movieDocs = [
	{
		path: 'title',
		name: 'Title',
		type: 'String'
	},
	{
		path: 'genre.name',
		name: 'Genre',
		type: 'String'
	},
	{ 
		path: 'numberInStock',
		name: 'Stock',
		type: 'Number'
	},
	{
		path: 'dailyRentalRate',
		name: 'Rate',
		type: 'Number'
	}
];
