const Joi = require('@hapi/joi');
const { on } = require("./utils");

class TodoItem {
	constructor(draftTodoItem, db) {
		this.id = draftTodoItem.id || null;
		this.state = draftTodoItem.state || null;
		this.description = draftTodoItem.description || null;
		this.dateAdded = draftTodoItem.dateAdded || null;
		this.db = db;
	}

	async add() {
		this.dateAdded = new Date().toISOString();

		const [ error, result ] = await this.db.add(this.toObject());
		if (error) {
			console.log(error);
			throw new Error('Failed to persist a Todo Item');
		}

		this.id = result.id;
		return result;
	}

	async update() {
		const [ error, result ] = await on(this.db.update(this.toObject()));
		if (error) {
			console.log(error);
			throw new Error('Failed to persist a Todo Item');
		}

		return result;
	}

	async getInformationFromDB() {
		const [error, itemExists] = await on(this.db.itemExists(this.id));
		if(error) {
			throw new Error('Failed to get Todo Item Information from DB');
		}
		if (!itemExists){
			return null;
		}

		const [errorGet, item] = await on(this.db.get(this.id));
		if(errorGet) {
			throw new Error('Failed to get Todo Item Information from DB');
		}

		this.state = item.state;
		this.description = item.description;
		this.dateAdded = item.dateAdded;

		return this.toObject();
	}

	async delete() {
		const [ error, ] = await on(this.db.delete(this.id));
		if (error) {
			throw new Error('Failed to delete a Todo Item');
		}
	}

	updatePropertyIfDefined(property, value) {
		if (typeof value !== "undefined") {
			this[property] = value;
		}
	}

	static async getAll(db) {
		const [ error, result ] = await on(db.getAll());
		if (error) {
			throw new Error('Failed to get a List of Todo Items');
		}

		return result;
	}

	toObject() {
		return {
			id: this.id,
			state: this.state,
			description: this.description,
			dateAdded: this.dateAdded,
		}
	}
}

TodoItem.validations = {
	id: Joi.string(),
	description: Joi.string().trim(),
	filter: Joi.string().valid('ALL', 'COMPLETE', 'INCOMPLETE').empty([ '', null ]).default('ALL'),
	orderBy: Joi.string().valid('DESCRIPTION', 'DATE_ADDED').empty([ '', null ]).default('DESCRIPTION'),
	state: Joi.string().valid('COMPLETE', 'INCOMPLETE'),
};

module.exports = TodoItem;