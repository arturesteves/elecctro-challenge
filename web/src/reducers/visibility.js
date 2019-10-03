import { SET_VISIBILITY } from "../actions/visibility";
import { createSelector } from "reselect";
import { selectTodos } from "./todos";


const initialState = {
	visibility: 'ALL'
};

const todos = (state = initialState, action) => {
	switch (action.type) {
		case SET_VISIBILITY:
			return action.visibility;
		default:
			return state;
	}
};

const selectVisibilityFilter = (state) => state.visibility;
export const selectFilteredTodoList = createSelector(
	selectTodos,
	selectVisibilityFilter,
	(todos, visibilityFilter) => {
		switch (visibilityFilter) {
			case "INCOMPLETE":
				return todos.filter((todo) => todo.state === 'INCOMPLETE');
			case "ALL":
			default:
				return todos;

		}
	}
);

export default todos;