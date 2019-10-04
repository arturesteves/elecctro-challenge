import React from 'react';


const AddTodoItem = (props) => {
	return (
		<div>
			<form name="newTodoForm" onSubmit={ (e) => {
				e.preventDefault();
				onSubmit(e.target.todoDescription.value, props.onAdd)
			} }>
				<input type="text" name="todoDescription" placeholder="Write new task here" required={ true }/>
				<button type="submit">Create</button>
			</form>
		</div>
	);
};

const onSubmit = (description, onAdd) => {
	console.log('Todo Description:', description);
	const todo = {
		description
	};
	onAdd(todo);
	resetForm();
};

const resetForm = () => {
	const form = document.getElementsByName("newTodoForm")[0];
	form.reset();
};

export default AddTodoItem;
