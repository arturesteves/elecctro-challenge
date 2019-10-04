import React, { Fragment, useState } from 'react';
import * as PropTypes from 'prop-types';
import EditTodoItem from "./EditTodoItem";


const ViewTodoItem = ({ todo, onDelete, onEdit }) => {
	const [ mode, setMode ] = useState('VIEW');

	return (
		<Fragment>
			{ mode === 'VIEW' ? showViewMode(todo, onDelete, onEdit, setMode) : null }
			{ mode === 'EDIT' ? showEditMode(todo, onEdit, setMode) : null }
		</Fragment>
	);
};

const showViewMode = (todo, onDelete, onEdit, setMode) => {
	if (isTodoCompleted(todo)) {
		return <ViewCompleteTodoItem todo={ todo } onDelete={ onDelete }/>;
	}
	return <ViewIncompleteTodoItem todo={ todo } onDelete={ onDelete } onEdit={ onEdit } setMode={ setMode }/>
};

const isTodoCompleted = (todo) => {
	return todo.state === 'COMPLETE';
};

const showEditMode = (todo, onEdit, setMode) => {
	return <EditTodoItem todo={ todo } onEdit={ (newTodo) => {
		onEdit(newTodo);
		setMode('VIEW');
	} } onCancel={ () => {
		setMode('VIEW');
	} }/>
};

const ViewCompleteTodoItem = ({ todo, onDelete }) => {

	return (
		<Fragment>
			<input type="checkbox" name="todoCompleted" checked={ true } disabled={ true }/>
			<Strike>{ todo.description }</Strike>
			<button onClick={ () => {
				onDelete();
			} }>Delete
			</button>
		</Fragment>
	)
};

const ViewIncompleteTodoItem = ({ todo, onDelete, onEdit, setMode }) => {

	return (
		<Fragment>
			<input type="checkbox" name="todoCompleted" onChange={ (e) => {
				updateTodoState(e.target.value, todo, onEdit);
			} }/>
			<span>{ todo.description }{ ' ' }</span>
			<button onClick={ () => {
				setMode('EDIT');
			} }>Edit
			</button>
			<button onClick={ () => {
				onDelete();
			} }>Delete
			</button>
		</Fragment>
	)
};

const updateTodoState = (checked, todo, onEdit) => {
	onEdit({ ...todo, state: checked ? 'COMPLETE' : ' INCOMPLETE' });
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
