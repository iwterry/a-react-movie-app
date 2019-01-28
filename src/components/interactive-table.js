import React, { Component } from 'react';
import PropTypes from 'prop-types';

function wrapEventHandlers(handlers, items) {
	handlers = {...handlers}; 
	Object.keys(handlers).forEach(function(name) {
		const handler = handlers[name]; 
		handlers[name] = function(e) {
			return handler(e, items);
		};
	});
	return handlers;
}

export default class InteractiveTable extends  Component {
	createHeader(headings, numOfOtherElements) {
		let index = 0;
		let headingContent = headings.slice(1).map(function(heading) {
			index += 1;
			return <th key={`heading-${index}`}>{heading}</th>;
		})

		for(let i = 1; i <= numOfOtherElements; i += 1) {
			headingContent.push(
				<td key={`heading-${i + index}`}></td>
			);	
		}
		
		return (
			<thead>
				<tr>{headingContent}</tr>
			</thead>
		);
	}
	
	
	createRow(items, collectionOfInteractiveElements) {
		let index = 1; // assume index 0 is the id for the items
		let rowContent = items.slice(1).map(function(content, i) {
			index = i;
			return <td key={`col-${index}`}>{content}</td>;
		});
		
		
		index += 1; 
	
		const extraContent = collectionOfInteractiveElements.map(function(interactiveElement, i) {
			const handlers = interactiveElement.handlers || {};
			const otherProps = interactiveElement.otherProps || {};
			const { type } = interactiveElement;
			const wrappedHandlers = wrapEventHandlers(handlers, items);
			return (
				<td key={`col-${index + i}`}>
					{React.createElement(type, {...otherProps, ...wrappedHandlers})}
				</td>
			);
		});
		
		if(extraContent) {
			rowContent.push(...extraContent);
		}
		
		return (
			<tr key={`${items[0]}`}>
				{rowContent}
			</tr>
		);
	}
	
	createBody(collectionOfItems, collectionOfInteractiveElements) {
		return <tbody>{collectionOfItems.map((items) => this.createRow(items, collectionOfInteractiveElements))}</tbody>;
	}
	
	render() {
		let { headings, collectionOfItems, collectionOfInteractiveElements = []} = this.props;
		
		return (
			<table>
				{this.createHeader(headings, collectionOfInteractiveElements.length)}
				{this.createBody(collectionOfItems, collectionOfInteractiveElements)}
			</table>
		);
	}
}

InteractiveTable.propTypes = {
	headings: PropTypes.arrayOf(PropTypes.string).isRequired,
	collectionOfItems: PropTypes.arrayOf(PropTypes.array).isRequired,
	collectionOfInteractiveElements: PropTypes.arrayOf(
		PropTypes.shape({
			// the type of React element to create 
			type: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
			handlers: PropTypes.objectOf(PropTypes.func),
			otherProps: PropTypes.object
		})
	)
};