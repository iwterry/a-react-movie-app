import React from 'react';
import PropTypes from 'prop-types';

export default function LikeButton(props) {
	return <button onClick={props.handleLiked}>{props.isLiked() ? 'Unlike' : 'Like'}</button>;
}

LikeButton.propTypes = {
	handleLiked: PropTypes.func.isRequired,
	isLiked: PropTypes.func.isRequired
};
