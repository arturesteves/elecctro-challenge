import React from 'react';
import * as PropTypes from 'prop-types';
import ViewTodoItem from "./ViewTodoItem";
import ClickableHeader from "../containers/ClickableHeader";
import ViewTodoItemContainer from "../containers/ViewTodoItemContainer";


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
						<ViewTodoItemContainer todo={ todo } index={index}/>
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
