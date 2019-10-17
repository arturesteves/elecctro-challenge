const Joi = require('@hapi/joi');
const TodoItem = require("../TodoItem");
const { validateSchema, on } = require("../utils");

const handler = async (request, h, db) => {
	try {
		const schema = await validateSchema(Joi.object({
			id: TodoItem.validations.id.required()
		}), request.params);

		request.server.log([ 'HTTP', 'Todo', 'Delete Item' ], `Payload: ${ JSON.stringify(schema) }`);

		if (schema.errors) {
			request.server.log([ 'HTTP', 'Todo', 'Add Item' ], `Schema Validation Failed`);
			return h.response({ errors: schema.errors }).code(400);
		}

		const todoItem = new TodoItem({ id: schema.id }, db);
		const [ error, result ] = await on(todoItem.delete());
		if (error) {
			request.server.log([ 'HTTP', 'Todo', 'Delete Item' ],
				`An Error Occurred while Deleting an Item, ${ error.toString() }`);
			return h.response({ error: error.message }).code(500);
		}

		if (result == null) {
			request.server.log([ 'HTTP', 'Todo', 'Delete Item' ], `Todo Item with id:${ schema.id } does not exist`);
			return h.response('Todo Item Not Found').code(404);
		}
		return '';

	} catch (e) {
		request.server.log([ 'HTTP', 'Todo', 'Delete Item' ], `Something Went Wrong: ${ e.toString() }`);
		return h.response({ error: 'Something Went Wrong' }).code(500);
	}
};

module.exports = (db) => {
	return {
		method: 'DELETE',
		path: '/todo/{id}',
		options: {
			handler: async (request, h) => {
				return handler(request, h, db);
			},
			description: 'This route removes an item from the to-do list. The item will be referenced by id using the URL parameter id.',
		}
	}
};
