import React, { Fragment, useState } from 'react';
import * as PropTypes from 'prop-types';
import EditTodoItem from "./EditTodoItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";


const ViewTodoItem = ({ todo, onDelete, onEdit, displayNotification }) => {
	const [ mode, setMode ] = useState('VIEW');

	return (
		<ListItem role={ undefined } dense button>
			{ mode === 'VIEW' ? showViewMode(todo, onDelete, onEdit, setMode, displayNotification) : null }
			{ mode === 'EDIT' ? showEditMode(todo, onEdit, setMode, displayNotification) : null }
		</ListItem>
	);
};

const showViewMode = (todo, onDelete, onEdit, setMode, displayNotification) => {
	if (isTodoCompleted(todo)) {
		return <ViewCompleteTodoItem todo={ todo } onDelete={ onDelete } displayNotification={ displayNotification }/>;
	}
	return <ViewIncompleteTodoItem todo={ todo } onDelete={ onDelete } onEdit={ onEdit } setMode={ setMode }
																 displayNotification={ displayNotification }/>
};

const isTodoCompleted = (todo) => {
	return todo.state === 'COMPLETE';
};

const showEditMode = (todo, onEdit, setMode, displayNotification) => {
	return <EditTodoItem todo={ todo } onEdit={ (newTodo) => {
		onEdit(newTodo, () => {
			displayNotification(successNotification(<p>Your todo was updated with success &#128522;</p>));
		}, () => {
			displayNotification(
				failureNotification(<p>Something Happened and we could not update your todo &#128522;</p>));
		});
		setMode('VIEW');
	} } onCancel={ () => {
		setMode('VIEW');
	} }/>
};

const ViewCompleteTodoItem = ({ todo, onDelete, displayNotification }) => {

	return (
		<Fragment>
			<input type="checkbox" name="todoCompleted" checked={ true } disabled={ true }/>
			<Strike>{ todo.description }</Strike>
			<button onClick={ () => {
				onDelete(() => {
					displayNotification(successNotification(<p>Todo Deleted with Success</p>));
				}, () => {
					displayNotification(failureNotification(<p>We could not delete your Todo, Something happened</p>));
				});
			} }>Delete
			</button>
		</Fragment>
	)
};

const ViewIncompleteTodoItem = ({ todo, onDelete, onEdit, setMode, displayNotification }) => {
	const labelId = `checkbox-list-label-${ todo.id }`;

	return (
		<Fragment>
			<ListItemIcon>
				<Checkbox
					edge="start"
					onChange={ (e) => {
						updateTodoState(e.target.checked, todo, onEdit, displayNotification);
					} }
					tabIndex={ -1 }
					disableRipple
					inputProps={ { 'aria-labelledby': labelId } }
				/>
			</ListItemIcon>
			<ListItemText id={ labelId } primary={ todo.description }/>
			<ListItemSecondaryAction>
				<IconButton edge="end" aria-label="edit" onClick={ () => {
					setMode('EDIT');
				} }>
					<EditIcon/>
				</IconButton>
				<IconButton edge="end" aria-label="delete" onClick={ () => {
					onDelete(() => {
						displayNotification(successNotification(<p>Todo Deleted with Success</p>));
					}, () => {
						displayNotification(failureNotification(<p>We could not delete your Todo, Something happened</p>));
					});
				} }>
					<DeleteIcon color={ "secondary" }/>
				</IconButton>
			</ListItemSecondaryAction>
		</Fragment>
	)
};

const updateTodoState = (checked, todo, onEdit, displayNotification) => {
	onEdit({ ...todo, state: checked ? 'COMPLETE' : ' INCOMPLETE' }, () => {
		displayNotification(successNotification(<p>Your todo is now completed &#128522;</p>));
	}, () => {
		displayNotification(
			failureNotification(<p>Something Happened and we could not mark you todo as completed &#128522;</p>));
	});
};

const successNotification = (message) => {
	return createNotification(message, { appearance: 'success' });
};

const failureNotification = (message) => {
	return createNotification(message, { appearance: 'error' });
};

const createNotification = (message, options) => {
	return {
		message: message,
		options: {
			autoDismissTimeout: 7000,
			autoDismiss: true,
			...options
		}
	}
};

const Strike = (props) => {
	return (
		<Fragment>
			<span style={ { color: ' red', textDecoration: ' line-through' } }>
  			<span style={ { color: ' black' } }>{ props.children }</span>
			</span>
		</Fragment>
	);
};

ViewTodoItem.propTypes = {
	todo: PropTypes.shape({
		id: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		state: PropTypes.string.isRequired,
		dateAdded: PropTypes.string
	}).isRequired
};

export default ViewTodoItem;
