const Joi = require('@hapi/joi');
const TodoItem = require("../TodoItem");
const { validateSchema, on } = require("../utils");

const handler = async (request, h, db) => {
	try {
		const schema = await validateSchema(Joi.object({
			id: TodoItem.validations.id.required()
		}), request.params);

		if (schema.errors) {
			return { errors: schema.errors };
		}

		try {
			const todoItem = new TodoItem({ id: schema.id }, db);
			const [ error, result ] = await on(todoItem.delete());
			if (error) {
				return h.response({ error: error.message }).code(404);
			}

			if (result == null) {
				return h.response('Todo Item Not Found').code(404);
			}
			return '';
		} catch (e) {
			console.log(e);
			return e;
		}

	} catch (e) {
		console.log(e);
		return e;
	}
};

module.exports = (db) => {
	return {
		method: 'DELETE',
		path: '/todo/{id}',
		handler: async (request, h) => {
			return handler(request, h, db);
		}
	}
};
