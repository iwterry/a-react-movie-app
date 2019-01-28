import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Movies from '../components/movies';
import MovieForm from '../components/movie-form';

export default function MovieRoutes(props) {
	const { url: baseUrl } = props.match;
	
	return (
		<React.Fragment>
			<Switch>
				{[`${baseUrl}/new`, `${baseUrl}/:id`].map(function(path) {
					return (
						<Route 
							key={path}
							path={path}
							exact={true}
							render={function(props) { 
								return <MovieForm history={props.history} movieId={props.match.params.id} />;
							}}
						/>
					);
				})}
				<Route path={`${baseUrl}`} exact={true} render={(props) => <Movies url={baseUrl} history={props.history}/> } />
			</Switch>
		</React.Fragment>
	);
}
