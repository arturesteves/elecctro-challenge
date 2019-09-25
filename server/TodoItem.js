
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

		const result = await this.db.add(this.toObject());
		this.id = result.id;
		return result;
	}

	async getInformation() {
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

module.exports = TodoItem;