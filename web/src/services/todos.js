import axios from 'axios';


const protocol = 'http';
const hostname = 'localhost:3000';
const baseURL = `${ protocol }://${ hostname }`;


export const getTodoItemsRequest = async (filters = { state: 'ALL', orderBy: 'DATE_ADDED' }) => {
	const [ error, response ] = await on(axios({
		method: 'GET',
		url: `${ baseURL }/todos?filter=${ filters.state }&orderBy=${ filters.orderBy }`,
	}));
	if (error) {
		console.log('Add Todo Item Request Error:', error);
		return { error };
	}
	return response;
};

export const addTodoItemRequest = async (todo) => {
	const [ error, response ] = await on(axios({
		method: 'PUT',
		url: `${ baseURL }/todos`,
		data: todo
	}));
	if (error) {
		console.log('Add Todo Item Request Error:', error);
		return { error };
	}
	return response;
};

export const editTodoItemRequest = async (todo) => {
	const [ error, response ] = await on(axios({
		method: 'PATCH',
		url: `${ baseURL }/todo/${ todo.id }`,
		data: { state: todo.state, description: todo.description }
	}));
	if (error) {
		console.log('Edit Todo Item Request Error:', error);
		return { error };
	}
	return response;
};

export const deleteTodoItemRequest = async (id) => {
	const [ error, response ] = await on(axios({
		method: 'DELETE',
		url: `${ baseURL }/todo/${ id }`
	}));
	if (error) {
		console.log('Delete Todo Item Request Error:', error);
		return { error };
	}
	return response;
};

const on = async promise => {
	try {
		const data = await promise;
		return [ null, data ];
	} catch (error) {
		return [ error ];
	}
};
