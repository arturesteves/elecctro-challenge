import React from 'react';


const AddTodoItem = (props) => {
	return (
		<div>
			<form name="newTodoForm" onSubmit={ (e) => {
				e.preventDefault();
				onSubmit(e.target.todoDescription.value, props.onAdd, props.displayNotification)
			} }>
				<input type="text" name="todoDescription" placeholder="Write new task here" required={ true }/>
				<button type="submit">Create</button>
			</form>
		</div>
	);
};

const onSubmit = (description, onAdd, displayNotification) => {
	console.log('Todo Description:', description);
	const todo = {
		description
	};
	onAdd(todo, () => {
		displayNotification(successNotification());
	}, () => {
		displayNotification(failureNotification());
	});

	resetForm();
};

const successNotification = () => {
	return {
		message: <p>Your todo was created and saved &#128522;</p>,
		options: {
			appearance: 'success',
			autoDismissTimeout: 7000,
			autoDismiss: true,
		}
	};
};

const failureNotification = () => {
	return {
		message: <p>You could not create you todo &#128522;</p>,
		options: {
			appearance: 'error',
			autoDismissTimeout: 7000,
			autoDismiss: true,
		}
	};
};

const resetForm = () => {
	const form = document.getElementsByName("newTodoForm")[0];
	form.reset();
};

export default AddTodoItem;
