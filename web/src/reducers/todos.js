import { ADD_TODO } from "../actions/todos";


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
		default:
			return state;
	}
};

export const getTodosFromStore = state => state;

export default todos;