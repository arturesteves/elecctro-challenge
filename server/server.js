const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const Database = require("./Database");
const TodoItem = require("./TodoItem");

const server = Hapi.server({
	port: 3000,
	host: 'localhost',
	cache: [ Database.options ]
});

const db = new Database(server);

const validateSchema = async (schema, object) => {
	try {
		await schema.validateAsync(object, { abortEarly: false });
		return object;
	} catch (err) {
		const errors = err.details;
		const messages = [];
		for (let e of errors) {
			messages.push(e.message);
		}
		return { errors: messages };
	}
};

server.route({
	method: 'PUT',
	path: '/todos',
	handler: async (request, h) => {
		try {
			const { description, ...remainingProperties } = request.payload;

			const schema = await validateSchema(Joi.object({
				description: Joi.string().trim().required()
			}), { description, ...remainingProperties });

			if (schema.errors) {
				return schema.errors;
			}

			const item = {
				state: 'INCOMPLETE',
				description: schema.description,
			};

			const todoItem = new TodoItem(item, db);
			await todoItem.persist();

			console.log('Todo Item saved');

			return todoItem.toObject();
		} catch (e) {
			console.log(e);
			return e;
		}
	}
});

server.route({
	method: 'GET',
	path: '/todos',
	handler: async (request, h) => {
		try {
			const { filter = 'ALL', orderBy = 'DATE_ADDED', ...remainingFields } = request.query;

			const schema = await validateSchema(Joi.object({
				filter: Joi.string().valid('ALL', 'COMPLETE', 'INCOMPLETE'),
				orderBy: Joi.string().valid('DESCRIPTION', 'DATE_ADDED'),
			}), { filter, orderBy, ...remainingFields });

			if (schema.errors) {
				return schema.errors;
			}

			const todoList = await TodoItem.getAll(db);
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
			console.log(e);
			return e;
		}
	}
});

server.route({
	method: 'DELETE',
	path: '/todo/{id}',
	handler: async (request, h) => {
		try {
			const schema = await validateSchema(Joi.object({
				id: Joi.number().positive().required()
			}), { ...request.params });

			if (schema.errors) {
				return schema.errors;
			}

			try {
				const todoItem = new TodoItem({id: schema.id}, db);
				const result = await todoItem.delete();

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
	}
});

server.route({
	method: 'PATCH',
	path: '/todo/{id}',
	handler: async (request, h) => {
		try {
			const { id } = request.params;
			const { state, description } = request.payload;

			const queryStringSchema = await validateSchema(Joi.object({
				id: Joi.number().positive().required(),
			}), { ...request.params });

			const payloadSchema = await validateSchema(Joi.object({
				state: Joi.string().valid('COMPLETE', 'INCOMPLETE'),
				description: Joi.string().trim()
			}).min(1), { ...request.payload });

			if (queryStringSchema.errors || payloadSchema.errors) {
				return [ ...queryStringSchema.errors || [], ...payloadSchema.errors || [] ];
			}

			const todoItem = new TodoItem({id: id}, db);
			const result = await todoItem.getInformationFromDB();

			if(result == null) {
				return h.response('Todo Item Not Found').code(404);
			}

			if (todoItem.state === 'COMPLETE') {
				return h.response('Todo Item Already Completed').code(400);
			}

			todoItem.updatePropertyIfDefined("state", state);
			todoItem.updatePropertyIfDefined("description", description);

			const newItem = await todoItem.persist();
			console.log('Todo Item updated');

			return newItem;
		} catch (e) {
			console.log(e);
			return e;
		}
	}
});

const start = async function () {

	try {
		await server.start();
	} catch (err) {
		console.log(err);
		process.exit(1);
	}

	console.log(`Server running on ${ server.info.uri }`);
};

start();
