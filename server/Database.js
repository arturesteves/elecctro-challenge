const CatboxMemory = require('@hapi/catbox-memory');

const options = {
	name: 'elecctro_server_cache',
	provider: {
		constructor: CatboxMemory,
		options: {
			partition: 'todo_list_cached_data',
		}
	}
};

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

		await this.cache.set(key, item, this.itemTTL);
		this.nextTodoId++;

		return item;
	};

	async update(newItem, id) {
		const item = await this.get(id);
		const key = {
			segment: this.segment,
			id: item.id
		};

		await this.cache.set(key, item, this.itemTTL);

		return item;
	};

	async get(id) {
		const key = {
			segment: this.segment,
			id,
		};

		const item = await this.cache.get(key);
		if (item == null) {
			throw Error('Item Not Found');
		}

		return item;
	};

	async getAll() {
		const list = [];

		for (let i = 1; i < this.nextTodoId; i++) {
			const item = await this.cache.get(i.toString());
			list.push(item);
		}

		return list;
	};

	async remove(id) {
		const item = await this.get(id);
		const key = {
			segment: this.segment,
			id: item.id
		};

		await this.cache.drop(key);
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