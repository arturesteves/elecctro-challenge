import { ADD_TODO, EDIT_TODO, FETCH_TODOS } from "../actions/todos";


const initialState = [
	{
		id: 'asd',
		state: 'INCOMPLETE',
		description: 'asd',
		dateAdded: ''
	},
	{
		id: 'asdasd',
		state: 'COMPLETE',
		description: 'asdas123',
		dateAdded: ''
	},
];

const todos = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TODO:
			return [ ...state, action.newTodo ];
		case FETCH_TODOS:
			return action.todos;
		case EDIT_TODO:
			let newState = [ ...state ];
			newState[action.index] = { ...state[action.index], ...action.todo };
			return newState;
		case DELETE_TODO:
			let newState = [ ...state ];
			newState.splice(action.index, 1);
			return newState;
		default:
			return state;
	}
};

export const selectTodos = state => state.todos;

export default todos;