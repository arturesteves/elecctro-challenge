import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';


const AddTodoItem = (props) => {
	return (
		<div>
			<form name="newTodoForm" onSubmit={ (e) => {
				e.preventDefault();
				onSubmit(e.target.todoDescription.value, props.onAdd, props.displayNotification)
			} }>
				<TextField
					type="text"
					name="todoDescription"
					required={ true }
					label="Todo Description"
					placeholder="Save the World"
					autoComplete={"off"}
					fullWidth
					margin="normal"
					InputLabelProps={ {
						shrink: true,
					} }
				/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					startIcon={ <AddIcon/> }
					size="small"
				>Create
				</Button>
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
