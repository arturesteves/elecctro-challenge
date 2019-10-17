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
			return { errors: schema.errors };
		}

		const [ error, todoList ] = await on(TodoItem.getAll(db));
		if (error) {
			request.server.log([ 'HTTP', 'Todo', 'List Items' ],
				`An Error Occurred while Listing the Items, ${ JSON.stringify(error) }`);
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
		request.server.log([ 'HTTP', 'Todo', 'List Items' ], `Something Went Wrong: ${ JSON.stringify(e) }`);
		return h.response({ error: 'Something Went Wrong' }).code(500);
	}
};

module.exports = (db) => {
	return {
		method: 'GET',
		path: '/todos',
		handler: async (request, h) => {
			return handler(request, h, db);
		}
	}
};
