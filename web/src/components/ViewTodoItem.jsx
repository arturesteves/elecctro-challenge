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
import { makeStyles, Tooltip } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { format, parseISO } from 'date-fns';


const getDateTimeFormatted = (date) => {
	const dateISO = parseISO(date);
	let dateFormatted = '';
	try {
		dateFormatted = format(dateISO, 'dd/MM/yyyy - hh:mm:ss');
	} catch (e) {
		console.log(e);
		console.log('can\'t format date');
	}
	return dateFormatted;
};

const useStyles = makeStyles(theme => ({
	root: {
		marginTop: "12px"
	},
}));

const ViewTodoItem = ({ todo, onDelete, onEdit, displayNotification }) => {
	const classes = useStyles();
	const [ mode, setMode ] = useState('VIEW');

	return (
		<Tooltip title={ `Created at ${ getDateTimeFormatted(todo.dateAdded) }` } placement="top">
			<Paper className={ classes.root } elevation={ 10 }>
				<ListItem role={ undefined } dense button>
					{ mode === 'VIEW' ? showViewMode(todo, onDelete, onEdit, setMode, displayNotification) : null }
					{ mode === 'EDIT' ? showEditMode(todo, onEdit, setMode, displayNotification) : null }
				</ListItem>
			</Paper>
		</Tooltip>
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
	const labelId = `checkbox-list-label-${ todo.id }`;

	return (
		<Fragment>
			<Checkbox
				edge="start"
				name="todoCompleted"
				checked={ true }
				tabIndex={ -1 }
				disableRipple
				disabled={ true }
				inputProps={ { 'aria-labelledby': labelId } }
			/>
			<Strike>{ todo.description }</Strike>
			<ListItemSecondaryAction>
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
