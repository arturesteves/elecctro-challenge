const Joi = require('@hapi/joi');

class TodoItem {
	constructor(draftTodoItem, db) {
		this.id = draftTodoItem.id || null;
		this.state = draftTodoItem.state || null;
		this.description = draftTodoItem.description || null;
		this.dateAdded = draftTodoItem.dateAdded || null;
		this.db = db;
	}

	async persist() {
		if (this.id) {
			return await this.db.update(this.toObject());
		}
		this.dateAdded = new Date().toISOString();
		const result = await this.db.add(this.toObject());
		this.id = result.id;
		return result;
	}

	async getInformationFromDB() {
		if (!await this.db.itemExists(this.id)) {
			return null;
		}
		const item = await this.db.get(this.id);
		this.state = item.state;
		this.description = item.description;
		this.dateAdded = item.dateAdded;

		return this.toObject();
	}

	async delete() {
		return this.db.delete(this.id);
	}

	updatePropertyIfDefined(property, value) {
		if (typeof value !== "undefined") {
			this[property] = value;
		}
	}

	static async getAll(db) {
		return db.getAll();
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
	id: Joi.number().positive().required(),
	description: Joi.string().trim().required(),
	filter: Joi.string().valid('ALL', 'COMPLETE', 'INCOMPLETE'),
	orderBy: Joi.string().valid('DESCRIPTION', 'DATE_ADDED'),
};

module.exports = TodoItem;