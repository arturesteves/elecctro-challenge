import { addTodoItemRequest, deleteTodoItemRequest, editTodoItemRequest, getTodoItemsRequest } from "../services/todos";


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
		if (result.error) {
			console.log('Add Todo Request Failed');
			return;
		}
		dispatch(addTodoAction(result.data));
	}
};


export const FETCH_TODOS = 'FETCH_TODOS';
export const fetchTodosAction = (todos) => {
	return {
		type: FETCH_TODOS,
		todos
	};
};
export const fetchTodos = () => {
	return async (dispatch) => {
		const result = await getTodoItemsRequest();
		console.log('Result', result);
		if (result.error) {
			console.log('Fetch Todos Request Failed');
			return;
		}
		dispatch(fetchTodosAction(result.data));
	}
};

export const EDIT_TODO = 'EDIT_TODO';
export const EDIT_TODO_FAILED = 'EDIT_TODO_FAILED';
export const editTodoAction = (todo, index) => {
	return {
		type: EDIT_TODO,
	}
};
export const editTodo = (todo, index) => {
	return async (dispatch) => {
		const result = await editTodoItemRequest(todo);
		console.log('RESULT', result);
		if (result.error) {
			console.log('Edit Todo Request Failed');
			dispatch(editTodoFailedAction());
			return;
		}
		dispatch(editTodoAction(result.data, index));
	}
};
export const editTodoFailedAction = () => {
	return {
		type: EDIT_TODO_FAILED
	}
};

export const DELETE_TODO = 'DELETE_TODO';
export const DELETE_TODO_FAILED = 'DELETE_TODO_FAILED';
export const deleteTodoAction = (id) => {
	return {
		type: DELETE_TODO,
		id
	}
};
export const deleteTodo = (id, index) => {
	return async (dispatch) => {
		const result = await deleteTodoItemRequest(id);
		if (result.error) {
			console.log('Delete Todo Request Failed');
			dispatch(deleteTodoFailedAction());
			return;
		}
		dispatch(deleteTodoAction(result.data, index));
	}
};
export const deleteTodoFailedAction = () => {
	return {
		type: DELETE_TODO_FAILED
	}
};