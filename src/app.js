import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import NavBar from './components/navbar';
import MovieRoutes from './routes/movie-routes';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/not-found';

import './css/main.css';

export default function App(props) {
	return (
		<BrowserRouter>
			<React.Fragment>
				<NavBar />
				<Switch>
					<Route path='/movies' component={MovieRoutes} />
					<Route path='/customers' component={Customers} />
					<Route path='/rentals' component={Rentals} />
					<Route path='/not-found' component={NotFound} />
					<Redirect from='/' to='/movies' exact={true} />
					<Redirect to='/not-found' /> 
				</Switch>
			</React.Fragment>
		</BrowserRouter>
	);
}