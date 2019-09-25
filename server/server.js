const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const Database = require("./Database");

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
				description,
				dateAdded: new Date().toISOString()
			};

			const itemAdded = await db.add(item);
			console.log('Todo Item saved');

			return itemAdded;
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

			const todoList = await db.getAll();
			// filter
			if (schema.filter !== 'ALL') {
				for (let i = todoList.length - 1; i >= 0; i--) {
					if (todoList[i].state === schema.filter) {
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
				const result = await db.remove(schema.id);
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

			if(await db.itemExists(id)) {
				return h.response('Todo Item Not Found').code(404);
			}

			const item = await db.get(id);
			if (item.state === 'COMPLETE') {
				return h.response('Todo Item Already Completed').code(400);
			}

			const updatedItem = { ...item };

			if (typeof state !== "undefined") {
				updatedItem.state = state;
			}
			if (typeof description !== "undefined") {
				updatedItem.description = description;
			}

			const newItem = await db.update(updatedItem);
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
