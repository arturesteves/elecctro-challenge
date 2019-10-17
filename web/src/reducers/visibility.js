import { fromJS } from 'immutable';
import { SET_VISIBILITY } from "../actions/visibility";
import { createSelector } from "reselect";
import { selectTodos } from "./todos";


const initialState = fromJS({
	visibility: 'ALL'
});

const visibility = (state = initialState, action) => {
	switch (action.type) {
		case SET_VISIBILITY:
			return state.set('visibility', action.visibility);
		default:
			return state;
	}
};

const selectVisibilityFilter = (state) => state.get('visibility').get('visibility');

export const selectFilteredTodoList = createSelector(
	selectTodos,
	selectVisibilityFilter,
	(todos, visibilityFilter) => {
		switch (visibilityFilter) {
			case "INCOMPLETE":
				return todos.filter((todo) => todo.state === 'INCOMPLETE'); //todo.get('state')
			case "ALL":
			default:
				return todos;
		}
	}
);

export default visibility;