import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from "../actions/todos";


const AddTodoItem = (props) => {
	return (
		<div>
			<form name="newTodoForm" onSubmit={ (e) => {
				e.preventDefault();
				onSubmit(e.target.todoDescription.value, props.dispatch)
			} }>
				<input type="text" name="todoDescription" placeholder="Write new task here" required={ true }/>
				<button type="submit">Create</button>
			</form>
		</div>
	);
};

const onSubmit = (description, dispatch) => {
	console.log('Todo Description:', description);
	const todo = {
		description
	};
	dispatch(addTodo(todo));
	resetForm();
};

const resetForm = () => {
	const form = document.getElementsByName("newTodoForm")[0];
	form.reset();
};

export default connect()(AddTodoItem);
