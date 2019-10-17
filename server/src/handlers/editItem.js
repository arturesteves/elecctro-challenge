const Joi = require('@hapi/joi');
const TodoItem = require("../TodoItem");
const { validateSchema, joinSchemas, on } = require("../utils");

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

		request.server.log([ 'HTTP', 'Todo', 'Edit Item' ], `Payload: ${ JSON.stringify(payloadSchema) }`);

		const schema = joinSchemas(queryStringSchema, payloadSchema);
		if (schema.errors) {
			request.server.log([ 'HTTP', 'Todo', 'Edit Item' ], `Schema Validation Failed`);
			return h.response(schema).code(400);
		}

		const todoItem = new TodoItem({ id: schema.id }, db);
		const [ error, result ] = await on(todoItem.getInformationFromDB());
		if (error) {
			request.server.log([ 'HTTP', 'Todo', 'Edit Item' ],
				`An Error Occurred while Editing an Item, ${ error.toString() }`);
			return h.response({ error: error.message }).code(500);
		}
		if (result == null) {
			request.server.log([ 'HTTP', 'Todo', 'Edit Item' ], `Todo Item with id:${ schema.id } does not exist`);
			return h.response('Todo Item Not Found').code(404);
		}
		if (todoItem.state === 'COMPLETE') {
			request.server.log([ 'HTTP', 'Todo', 'Edit Item' ], `Todo Item with id:${ schema.id } is in state: Completed`);
			return h.response('Todo Item Already Completed').code(400);
		}

		todoItem.updatePropertyIfDefined("state", schema.state);
		todoItem.updatePropertyIfDefined("description", schema.description);

		const newItem = await todoItem.update();
		request.server.log([ 'HTTP', 'Todo', 'Edit Item' ], `Todo Item with id: ${ schema.id } Updated`);

		return newItem;
	} catch (e) {
		request.server.log([ 'HTTP', 'Todo', 'Edit Item' ], `Something Went Wrong: ${ e.toString() }`);
		return h.response({ error: 'Something Went Wrong' }).code(500);
	}
};

module.exports = (db) => {
	return {
		method: 'PATCH',
		path: '/todo/{id}',
		options: {
			handler: async (request, h) => {
				return handler(request, h, db);
			},
			description: 'This route should edit an item on the to-do list. The edited item will be referenced by id using the URL parameter id.',
			notes: 'The expected request body should contain a single JSON object with a combination of the following fields described in the payload.',
		}
	}
};
