const Joi = require('@hapi/joi');
const TodoItem = require("../TodoItem");
const { validateSchema, joinSchemas } = require("../utils");

const handler = async (request, h, db) => {
	try {
		const queryStringSchema = await validateSchema(Joi.object({
			id: TodoItem.validations.id.required(),
		}), request.params);

		const payloadSchema = await validateSchema(Joi.object({
			state: TodoItem.validations.state,
			description: TodoItem.validations.description,
		}).min(1).error(errors => {
			errors.forEach(err => {
				if (err.code === 'object.min') {
					return err.message = 'Necessary to define at least one of the following properties: \"state\" or \"description\"'
				}
			});
			return errors;
		}), request.payload);

		const schema = joinSchemas(queryStringSchema, payloadSchema);
		if (schema.errors) {
			return schema;
		}

		const todoItem = new TodoItem({ id: schema.id }, db);
		const result = await todoItem.getInformationFromDB();

		if (result == null) {
			return h.response('Todo Item Not Found').code(404);
		}

		if (todoItem.state === 'COMPLETE') {
			return h.response('Todo Item Already Completed').code(400);
		}

		todoItem.updatePropertyIfDefined("state", schema.state);
		todoItem.updatePropertyIfDefined("description", schema.description);

		const newItem = await todoItem.persist();
		console.log('Todo Item updated');

		return newItem;
	} catch (e) {
		console.log(e);
		return e;
	}
};

module.exports = (db) => {
	return {
		method: 'PATCH',
		path: '/todo/{id}',
		handler: async (request, h) => {
			return handler(request, h, db);
		}
	}
};
