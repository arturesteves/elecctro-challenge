import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { setTodosVisibility } from "../actions/visibility";


const ControlTodoListItemsVisibility = (props) => {

	return (
		<Fragment>
			<span>Hide Completed</span>
			<input type="checkbox" name="hideCompleted"
						 onChange={ (e) => changeTodoListItemsVisibility(e.target.checked, props.dispatch) }/>
		</Fragment>
	);
};

const changeTodoListItemsVisibility = (checked, dispatch) => {
	const visibility = checked ? 'INCOMPLETE' : 'ALL';
	dispatch(setTodosVisibility(visibility));
};

export default connect()(ControlTodoListItemsVisibility);
