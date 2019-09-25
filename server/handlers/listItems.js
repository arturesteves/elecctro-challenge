const Joi = require('@hapi/joi');
const TodoItem = require("../TodoItem");
const { validateSchema } = require("../utils");

const handler = async (request, h, db) => {
	try {
		const schema = await validateSchema(Joi.object({
			filter: TodoItem.validations.filter,
			orderBy: TodoItem.validations.orderBy,
		}), request.query);

		if (schema.errors) {
			return { errors: schema.errors };
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
