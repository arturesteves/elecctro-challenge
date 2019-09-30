import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import ViewTodoItem from "./ViewTodoItem";


const markTodo = (e) => {
	console.log(e.target.checked);

};

const ListTodoItems = ({ todos: todoList }) => {
	const [ todos, setTodos ] = useState([]);

	useEffect(() => {
		setTodos(todoList);
	}, []);

	return (
		<div>
			<ul>
				{ todos.map((todo, index) => {
					return <li key={ index }>
						<ViewTodoItem todo={todo}/>
					</li>;
				}) }
			</ul>
		</div>
	);
};

ListTodoItems.propTypes = {
	todos: PropTypes.array.isRequired
};

export default ListTodoItems;
