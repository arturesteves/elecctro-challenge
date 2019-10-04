import { ADD_TODO, DELETE_TODO, EDIT_TODO, FETCH_TODOS } from "../actions/todos";


const initialState = [];

const todos = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TODO:
			return [ ...state, action.newTodo ];
		case FETCH_TODOS:
			return action.todos;
		case EDIT_TODO:
			return updateItem(state, action.todo, action.index);
		case DELETE_TODO:
			return deleteItem(state, action.index);
		default:
			return state;
	}
};

const deleteItem = (array, index) => {
	let newArray = [ ...array ];
	newArray.splice(index, 1);
	return newArray;
};

const updateItem = (array, item, index) => {
	let newArray = [ ...array ];
	newArray[index] = { ...array[index], ...item };
	return newArray;
};

export const selectTodos = state => state.todos;

export default todos;