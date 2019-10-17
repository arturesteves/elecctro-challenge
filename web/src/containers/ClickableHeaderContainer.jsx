import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
	SORT_ALPHABETICALLY_ASCENDING,
	SORT_ALPHABETICALLY_DESCENDING,
	SORT_CREATION_DATE_ASCENDING,
	sortTodos
} from "../actions/sorting";


const ClickableHeaderContainer = (props) => {
	const [ numberOfClicks, setNumberOfClicks ] = useState(0);

	return (
		<h1 onClick={ (e) => {
			sortTodoListItems(props.dispatch, numberOfClicks, setNumberOfClicks);
		} }>{ props.children }</h1>
	);
};

const sortTodoListItems = (dispatch, numberOfClicks, setNumberOfClicks) => {
	switch (numberOfClicks) {
		case 0:
			dispatch(sortTodos(SORT_ALPHABETICALLY_ASCENDING));
			setNumberOfClicks(numberOfClicks + 1);
			break;
		case 1:
			dispatch(sortTodos(SORT_ALPHABETICALLY_DESCENDING));
			setNumberOfClicks(numberOfClicks + 1);
			break;
		case 2:
		default:
			dispatch(sortTodos(SORT_CREATION_DATE_ASCENDING));
			setNumberOfClicks(0);
			break;
	}
};

export default connect()(ClickableHeaderContainer);
