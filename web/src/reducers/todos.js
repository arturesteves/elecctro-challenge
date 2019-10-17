import { fromJS } from 'immutable';
import { ADD_TODO, DELETE_TODO, DELETE_TODO_FAILED, EDIT_TODO, EDIT_TODO_FAILED, FETCH_TODOS } from "../actions/todos";


const initialState = fromJS([]);

const todos = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TODO:
			return fromJS([ ...state, action.newTodo ]);
		case FETCH_TODOS:
			return fromJS(action.todos);
		case EDIT_TODO:
			return fromJS(updateItem(state, action.todo, action.index));
		case DELETE_TODO:
			return fromJS(deleteItem(state, action.index));
		case EDIT_TODO_FAILED:
		case DELETE_TODO_FAILED:
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

export const selectTodos = state => state.get('todos').toJS();

export default todos;