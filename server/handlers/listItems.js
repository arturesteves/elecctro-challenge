const Joi = require('@hapi/joi');
const TodoItem = require("../TodoItem");
const { validateSchema, on } = require("../utils");

const handler = async (request, h, db) => {
	try {
		const schema = await validateSchema(Joi.object({
			filter: TodoItem.validations.filter,
			orderBy: TodoItem.validations.orderBy,
		}), request.query);

		request.server.log([ 'HTTP', 'Todo', 'List Items' ], `Payload: ${ JSON.stringify(schema) }`);

		if (schema.errors) {
			request.server.log([ 'HTTP', 'Todo', 'List Items' ], `Schema Validation Failed`);
			return h.response({ errors: schema.errors }).code(400);
		}

		const [ error, todoList ] = await on(TodoItem.getAll(db));
		if (error) {
			request.server.log([ 'HTTP', 'Todo', 'List Items' ],
				`An Error Occurred while Listing the Items, ${ error.toString() }`);
			return h.response({ error: error.message }).code(500);
		}

		// filter
		if (schema.filter !== 'ALL') {
			for (let i = todoList.length - 1; i >= 0; i--) {
				if (todoList[i].state !== schema.filter) {
					todoList.splice(i, 1);
				}
			}
		}

		// sort
		if (schema.orderBy === 'DESCRIPTION') {
			todoList.sort((a, b) => {
				if (a.description < b.description) {
					return -1;
				}
				if (a.description > b.description) {
					return 1;
				}
				return 0;
			});
		} else {
			todoList.sort((a, b) => {
				if (a.dateAdded < b.dateAdded) {
					return -1;
				}
				if (a.dateAdded > b.dateAdded) {
					return 1;
				}
				return 0;
			});
		}

		return todoList;
	} catch (e) {
		request.server.log([ 'HTTP', 'Todo', 'List Items' ], `Something Went Wrong: ${ e.toString() }`);
		return h.response({ error: 'Something Went Wrong' }).code(500);
	}
};

module.exports = (db) => {
	return {
		method: 'GET',
		path: '/todos',
		options: {
			handler: async (request, h) => {
				return handler(request, h, db);
			},
			description: 'This route should list the to-do items on the list taking into account the conditions imposed on the query parameters.',
			notes: 'The filter query parameter is optional and can be ‘ALL’, ‘COMPLETE’, or ‘INCOMPLETE’. If not specified, the default filter is ‘ALL’. ' +
				'The orderBy query parameter is also optional and can be ‘DESCRIPTION’ or ‘DATE_ADDED’. If not specified, the default order is ‘DATE_ADDED’.',
		}
	}
};
