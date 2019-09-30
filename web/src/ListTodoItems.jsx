import React from 'react';
import * as PropTypes from 'prop-types';

const ListTodoItems = ({ todos }) => {
	return (
		<div>
			<ul>
				{ todos.map((todo) => {
					return <li>{ todo.description }</li>;
				}) }
			</ul>
		</div>
	);
};

ListTodoItems.propTypes = {
	todos: PropTypes.array.isRequired
};

export default ListTodoItems;
