import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { genres } from '../services/fakeGenreService'; 
import * as moviesAPI from '../services/fakeMovieService';

// input field names 
const TITLE = 'title';
const GENRE_ID = 'genreId';
const NUMBER_IN_STOCK = 'numberInStock';
const DAILY_RENTAL_RATE = 'dailyRentalRate';

// Mapping input field names to movie properties. 
// For now the keys and values are mostly the same, but in the future this may change, so 
// I am allowing for some flexibility.
const mapOfFieldsToMovieProps = new Map();
mapOfFieldsToMovieProps.set(TITLE, TITLE);
mapOfFieldsToMovieProps.set(GENRE_ID, 'genre');
mapOfFieldsToMovieProps.set(NUMBER_IN_STOCK, NUMBER_IN_STOCK);
mapOfFieldsToMovieProps.set(DAILY_RENTAL_RATE, DAILY_RENTAL_RATE);


function validateTitle(title) {
	if(title.trim() === '') {
		return 'Must enter a valid character';
	}
	return '';
}

function validateGenreId(genreIdSelected) {
	const isValidSelection = genres.some((genre) => genre._id === genreIdSelected);
		
	if(!isValidSelection) {
		return 'Must make a valid selection';
	}
	return '';
}

function validateNumberInStock(numberInStockStr) {
	const isRepresentingAnInteger = (/^\d+(?:\.0+)?$/).test(numberInStockStr);
	// NOTE: A floating point number that is equal to an integer is also considered an integer.
	
	if(!isRepresentingAnInteger) {
		return 'Must be an integer';
	}
	
	const anInt = Number(numberInStockStr);
	
	if(anInt > 100 || anInt < 0) {
		return 'Must be between 0 and 100, inclusively';
	}
	
	return '';
}

function validateDailyRentalRate(rate) {
	const isOnlyFloatingPointOrDigits =(/^\d*\.?\d*$/).test(rate);
	const hasAtLeastOneDigit = (/\d/).test(rate);
	
	if(!isOnlyFloatingPointOrDigits || !hasAtLeastOneDigit) {
		return 'Must be a number';
	}
	
	const aNum = Number(rate);
	
	if(aNum < 0 || aNum > 5) {
		return 'Must be between 0 and 5, inclusively';
	}
	
	return '';
}

const fieldValidators = {
	[TITLE]: { validate: validateTitle },
	[GENRE_ID]: { validate: validateGenreId },
	[NUMBER_IN_STOCK]: { validate: validateNumberInStock },
	[DAILY_RENTAL_RATE]: { validate: validateDailyRentalRate }
};

const fieldCasters = {
	[TITLE]: { cast: String },
	[GENRE_ID]: { cast: (genreId) => genres.find((genre) => genre._id === genreId) },
	[NUMBER_IN_STOCK]: { cast: Number },
	[DAILY_RENTAL_RATE]: { cast: Number }
}


export default class MovieForm extends Component {
	constructor(props) {
		super(props);
		
		const movieData = {};
		for (let movieProp of mapOfFieldsToMovieProps.values()) {
			movieData[movieProp] =  '';
		}
		
		this.state = {
			movieData,
			errors: {}
		};
		
		this.willUseInitialMovieDataToValidate = false;
	}
	
	async componentDidMount() {
		const { movieId, history } = this.props;
		
		if(movieId == null) return;
		
		try {
			const movie = await moviesAPI.getMovie(movieId);
			
			if(movie == null) return history.replace('/not-found');
			
			this.willUseInitialMovieDataToValidate = true;	
			this.movie = movie;
			
			const movieData = {};		
			for (let movieProp of mapOfFieldsToMovieProps.values()) {
				movieData[movieProp] =  movie[movieProp];
			}
			
			this.setState({ movieData });
		} catch(err) {
			alert('Sorry, unable to retrieve the movie data');

		}
		
	}
	
	validateInput(field) {
		return fieldValidators[field.name].validate(field.value);
	}
	
	areAllInputsValid() {
		if(this.willUseInitialMovieDataToValidate) { // assume initial data is valid
			return true;
		}
		
		const { movieData } = this.state;
		
		for (let inputFieldName of mapOfFieldsToMovieProps.keys()) {
			const movieProp = mapOfFieldsToMovieProps.get(inputFieldName);
			const errorMessage = this.validateInput({
				name: inputFieldName,
				value: movieData[movieProp]
			});
			
			if(errorMessage) return false;
		}
		
		return true;
	}
	
	handleInputChange = (event) => {
		const field = event.target;
		
		// no longer use original data since user has made a change
		this.willUseInitialMovieDataToValidate = false; 
		
		
		this.setState(function(state) {
			let errors = { ...state.errors };
			let movieData = { ...state.movieData };
			
			const errorMessage = this.validateInput(field);
			const movieProp = mapOfFieldsToMovieProps.get(field.name);
			
			if(errorMessage === '') {
				delete errors[field.name];
			} else {
				errors[field.name] = errorMessage;
			}
			
			movieData[movieProp] = field.value;
			
			return {
				movieData, 
				errors
			}
		});
		
	}; 
	
	handleMovieSubmission = async (event) => {
		event.preventDefault();
		if(!this.areAllInputsValid()) {
			return;
		}
		
		const movieSubmitted = {};
		const { movieData } = this.state;
		const { movie } = this;

		
		for (let inputFieldName of mapOfFieldsToMovieProps.keys()) {
			const movieProp = mapOfFieldsToMovieProps.get(inputFieldName);
			movieSubmitted[movieProp] = fieldCasters[inputFieldName].cast(movieData[movieProp]); 
		};
		
		const movieToSave = { ...movie, ...movieSubmitted }
		
		try {
			await moviesAPI.saveMovie(movieToSave);
		} catch(err) {
			console.log(err);
			alert('Sorry, the details added was not saved');
		}
		
		this.props.history.replace('/movies');
	}
	
	render() {
		const { errors, movieData } = this.state;
		
		return (
			<div>
				<h1>Movie Form</h1>
				<form onSubmit={this.handleMovieSubmission}>
					<label>
						Title
						<input
							type="text"
							name={TITLE} 
							value={movieData[mapOfFieldsToMovieProps.get(TITLE)]}
							onChange={this.handleInputChange}
						/>
					</label>
					{errors[TITLE] && <p>{errors[TITLE]}</p>}
					<br />
					<label>
						Genre
						<select 
							name={GENRE_ID}
							value={movieData[mapOfFieldsToMovieProps.get(GENRE_ID)]}
							onChange={this.handleInputChange}
						>
							<option disabled={true} value=""></option>
							{genres.map((genre) => <option key={genre._id} value={genre._id}>{genre.name}</option>)};
						</select>
					</label>
					{errors.genre && <p>{errors.genre}</p>}
					<br />
					<label>
						Number In Stock
						<input
							type="number"
							name={NUMBER_IN_STOCK}
							min="0" 
							max="100"
							value={movieData[mapOfFieldsToMovieProps.get(NUMBER_IN_STOCK)]}
							onChange={this.handleInputChange}
						/>
					</label>
					{errors[NUMBER_IN_STOCK] && <p>{errors[NUMBER_IN_STOCK]}</p>}
					<br />
					<label>
						Daily Rental Rate
						<input
							type="number"
							name={DAILY_RENTAL_RATE}
							value={movieData[mapOfFieldsToMovieProps.get(DAILY_RENTAL_RATE)]}
							onChange={this.handleInputChange}
						/>
					</label>
					{errors[DAILY_RENTAL_RATE] && <p>{errors[DAILY_RENTAL_RATE]}</p>}
					<input type="submit" value="Save" className="submitBtn" disabled={!this.areAllInputsValid()} />
				</form>
			</div>
		);
	}
}

MovieForm.propTypes = {
	movieId: PropTypes.string,
	history: PropTypes.shape({
		replace: PropTypes.func.isRequired
	}).isRequired
};