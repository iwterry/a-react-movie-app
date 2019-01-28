import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar(props) {
	const activeClassName = 'active-resource';
	return (
		<nav>
			<ul>
				<li><NavLink to='/movies' activeClassName={activeClassName}>Movies</NavLink></li>
				<li><NavLink to='/customers' activeClassName={activeClassName}>Customers</NavLink></li>
				<li><NavLink to='/rentals' activeClassName={activeClassName}>Rentals</NavLink></li>
			</ul>
		</nav>
	);
}