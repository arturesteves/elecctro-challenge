import React, { useState, useEffect } from 'react';


const EditTodoItem = (props) => {
	const [ description, setDescription ] = useState('');

	useEffect(() => {
		setDescription(props.todo.description);
	}, []);

	return (
		<form name="editTodoForm" onSubmit={ (e) => {
			e.preventDefault();
			onSubmit(e.target.todoDescription.value, props.todo, props.onEdit)
		} }>
			<input type="text" name="todoDescription" placeholder="Write new task here" required={ true }
						 value={ description }
						 onChange={ (e) => {
							 setDescription(e.target.value);
						 } }/>
			<button type="submit">Save</button>
			<button type="button" onClick={ () => {
				props.onCancel();
			} }>Cancel
			</button>
		</form>
	)
};

const onSubmit = (description, currentTodo, onEdit) => {
	const todo = {
		id: currentTodo.id,
		description
	};
	onEdit(todo);
	resetForm();
};

const resetForm = () => {
	const form = document.getElementsByName("newTodoForm")[0];
	form.reset();
};

export default EditTodoItem;
