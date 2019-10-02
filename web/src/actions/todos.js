import { addTodoItemRequest } from "../services/todos";


export const ADD_TODO = 'ADD_TODO';
const addTodoAction = (newTodo) => {
	return {
		type: ADD_TODO,
		newTodo
	};
};
export const addTodo = (todo) => {
	return async (dispatch) => {
		const result = await addTodoItemRequest(todo);
		if(result.error) {
			console.log('Add Todo Request Failed');
			return;
		}
		dispatch(addTodoAction(result.data));
	}
};
