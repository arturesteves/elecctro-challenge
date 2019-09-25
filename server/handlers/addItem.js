const Joi = require('@hapi/joi');
const TodoItem = require("../TodoItem");
const { validateSchema, on } = require("../utils");

const handler = async (request, h, db) => {
	try {
		const schema = await validateSchema(Joi.object({
			description: TodoItem.validations.description.required()
		}), request.payload);

		if (schema.errors) {
			return { errors: schema.errors };
		}

		const item = {
			state: 'INCOMPLETE',
			description: schema.description,
		};

		const todoItem = new TodoItem(item, db);
		const [ error, ] = await on(todoItem.add());
		if (error) {
			return h.response({ error: error.message }).code(404);
		}
		console.log('Todo Item saved');

		return todoItem.toObject();
	} catch (e) {
		console.log(e);
		return e;
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
