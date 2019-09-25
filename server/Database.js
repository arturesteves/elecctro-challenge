const CatboxMemory = require('@hapi/catbox-memory');

class Database {

	constructor(server = null) {
		this.nextTodoId = 1;
		this.segment = 'todo_list';
		this.itemTTL = 50000;
		if (server == null) {
			throw Error("Couldn't init Database - Missing Server Info");
		}
		this.cache = server.cache({ segment: this.segment, expiresIn: 1000 * 5 });
	}

	async add(item) {
		const key = {
			segment: this.segment,
			id: this.nextTodoId.toString()
		};
		item.id = this.nextTodoId.toString();

		await this.cache.set(key, item, this.itemTTL);
		this.nextTodoId++;

		return item;
	};

	async update(newItem) {
		if (!await this.itemExists(newItem.id)) {
			return null;
		}

		const key = {
			segment: this.segment,
			id: newItem.id
		};

		await this.cache.set(key, newItem, this.itemTTL);

		return newItem;
	};

	async get(id) {
		const key = {
			segment: this.segment,
			id,
		};

		return await this.cache.get(key);
	};

	async getAll() {
		const list = [];

		for (let i = 1; i < this.nextTodoId; i++) {
			const item = await this.cache.get(i.toString());
			if (item != null) {
				list.push(item);
			}
		}

		return list;
	};

	async delete(id) {
		if (!await this.itemExists(id)) {
			return null;
		}
		const key = {
			segment: this.segment,
			id: id
		};

		await this.cache.drop(key);
		return id;
	}

	async itemExists(id) {
		return await this.get(id) != null;
	}
}

Database.options = {
	name: 'elecctro_server_cache',
	provider: {
		constructor: CatboxMemory,
		options: {
			partition: 'todo_list_cached_data',
		}
	}
};

module.exports = Database;