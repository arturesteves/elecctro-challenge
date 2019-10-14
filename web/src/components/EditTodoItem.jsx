import React, { useState, useEffect, Fragment } from 'react';
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";


const EditTodoItem = (props) => {
	const [ description, setDescription ] = useState('');

	useEffect(() => {
		setDescription(props.todo.description);
	}, []);

	const labelId = `checkbox-list-label-${ props.todo.id }`;

	return (
		<Fragment>
				<TextField
					id={labelId}
					type="text"
					label="Description"
					style={ { margin: 8, marginRight: 80 } }
					placeholder="Write a new task here"
					required
					fullWidth
					margin="normal"
					InputLabelProps={ {
						shrink: true,
					} }
					value={ description }
					onChange={ (e) => {
						setDescription(e.target.value);
					} }
				/>

			<ListItemSecondaryAction>
				<IconButton type="submit" edge="end" aria-label="save" onClick={ (e) => {
					onSubmit(description, props.todo, props.onEdit)
				} }>
					<SaveIcon/>
				</IconButton>

				<IconButton edge="end" aria-label="delete" onClick={ () => {
					props.onCancel();
				} }>
					<CancelIcon color={ "secondary" }/>
				</IconButton>
			</ListItemSecondaryAction>
		</Fragment>
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
