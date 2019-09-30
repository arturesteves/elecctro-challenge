import React from 'react';


const NewTodoItem = () => {
	return (
		<div>
			<form name="newTodoForm" onSubmit={ onSubmit }>
				<input type="text" name="todoDescription" required={ true }/>
				<button type="submit">Create</button>
			</form>
		</div>
	);
};

const onSubmit = (e) => {
	e.preventDefault();
	console.log('Todo Description:', e.target.todoDescription.value);

	resetForm();
};

const resetForm = () => {
	const form = document.getElementsByName("newTodoForm")[0];
	form.reset();
};

export default NewTodoItem;
