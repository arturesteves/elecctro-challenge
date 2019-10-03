import React from 'react';
import * as PropTypes from 'prop-types';
import ViewTodoItem from "./ViewTodoItem";
import ClickableHeader from "../containers/ClickableHeader";


const markTodo = (e) => {
	console.log(e.target.checked);

};

const ListTodoItems = ({ todos }) => {
	return (
		<div>
			<ClickableHeader>Tasks</ClickableHeader>
			<ul>
				{ todos.length === 0 ? <span>No Todos :(</span> : null }
				{ todos.map((todo, index) => {
					return <li key={ index }>
						<ViewTodoItem todo={ todo }/>
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
