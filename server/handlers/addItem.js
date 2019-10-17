const Joi = require('@hapi/joi');
const TodoItem = require("../TodoItem");
const { validateSchema, on } = require("../utils");

const handler = async (request, h, db) => {
	try {
		const schema = await validateSchema(Joi.object({
			description: TodoItem.validations.description.required()
		}), request.payload);

		request.server.log([ 'HTTP', 'Todo', 'Add Item' ], `Payload: ${ JSON.stringify(schema) }`);

		if (schema.errors) {
			request.server.log([ 'HTTP', 'Todo', 'Add Item' ], `Schema Validation Failed`);
			return { errors: schema.errors };
		}

		const item = {
			state: 'INCOMPLETE',
			description: schema.description,
		};

		const todoItem = new TodoItem(item, db);
		const [ error, ] = await on(todoItem.add());
		if (error) {
			request.server.log([ 'HTTP', 'Todo', 'Add Item' ],
				`An Error Occurred while Adding an Item, ${ JSON.stringify(error) }`);
			return h.response({ error: error.message }).code(500);
		}
		request.server.log([ 'HTTP', 'Todo', 'Add Item' ], 'Todo Item Saved');

		return todoItem.toObject();
	} catch (e) {
		request.server.log([ 'HTTP', 'Todo', 'Delete Item' ], `Something Went Wrong: ${ JSON.stringify(e) }`);
		return h.response({ error: 'Something Went Wrong' }).code(500);
	}
};

module.exports = (db) => {
	return {
		method: 'PUT',
		path: '/todos',
		handler: async (request, h) => {
			return handler(request, h, db);
		}
	}
};
