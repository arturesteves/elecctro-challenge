const Hapi = require('@hapi/hapi');
const CatboxMemory = require('@hapi/catbox-memory');
const Joi = require('@hapi/joi');

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
  cache: [
    {
      name: 'elecctro_server_cache',
      provider: {
        constructor: CatboxMemory,
        options: {
          partition: 'todo_list_cached_data',
        }
      }
    }
  ]
});

const Cache = server.cache({segment: 'todo_list', expiresIn: 1000 * 5});
const cacheSegment = 'todo_list';

let nextTodoId = 1;

const validateSchema = async (schema, object) => {
	try{
			await schema.validateAsync(object, {abortEarly: false});
			return object;
	}catch (err) {
		const errors = err.details;
		const messages = [];
		for(let e of errors) {
			messages.push(e.message);
		}
		return {errors: messages};
	}
};

server.route({
  method: 'PUT',
  path: '/todos',
  handler: async (request, h) => {
    try {
      const payload = request.payload;
      const { description } = payload;
      console.log('description', description);

      const newTodoItem = {
        id: nextTodoId.toString(),
        state: 'INCOMPLETE',
        description,
        dateAdded: new Date().toISOString()
      };
      console.log(`New Todo Item: ${ JSON.stringify(newTodoItem) }`);

      const key = {
        segment: cacheSegment,
        id: newTodoItem.id
      };

      console.log('key', key);
      await Cache.set(key, newTodoItem, 50000);
      console.log('Todo Item saved');

      nextTodoId++;
      return newTodoItem;
    }catch(e){
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
				filter: Joi.string().valid('ALL','COMPLETE', 'INCOMPLETE'),
				orderBy: Joi.string().valid('DESCRIPTION','DATE_ADDED'),
			}), {filter, orderBy, ...remainingFields});

      if(schema.errors) {
				return schema.errors;
			}

      const todoList = [];

      const key = {
        segment: cacheSegment,
      };

      for(let i = 1; i < nextTodoId; i++) {
      	key.id = i.toString();
				const item = await Cache.get(key);
				if(item != null) {
					todoList.push(item);
				}
			}

      console.log('Temp List', todoList);

      // filter
			if (schema.filter !== 'ALL') {
				console.log('Not ALL');
				for (let i = todoList.length - 1; i >= 0; i--) {
					if (todoList[i].state === schema.filter) {
						todoList.splice(i, 1);
					}
				}
			}

			// sort
			if(schema.orderBy === 'DESCRIPTION') {
				todoList.sort((a, b) => {
					if(a.description < b.description) return -1;
					if(a.description > b.description) return 1;
					return 0;
				});
			} else {
				todoList.sort((a, b) => {
					if(a.dateAdded < b.dateAdded) return -1;
					if(a.dateAdded > b.dateAdded) return 1;
					return 0;
				});
			}

      return todoList;
    }catch(e){
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
			const params = request.params;
			const { id} = params;

			const key = {
				segment: cacheSegment,
				id: id.toString()
			};

			const item = await Cache.get(key);
			if(item == null) {
				return h.response('Todo Item Not Found').code(404);
			}

			await Cache.drop(key);
			return '';
		}catch(e){
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

			const key = {
				segment: cacheSegment,
				id: id.toString()
			};

			const item = await Cache.get(key);
			if(item == null) {
				return h.response('Todo Item Not Found').code(404);
			}
			if(item.state === 'COMPLETE') {
				return h.response('Todo Item Already Completed').code(400);
			}

			const updatedItem = {...item};

			if(typeof state !== "undefined") {
				updatedItem.state = state;
			}
			if(typeof description !== "undefined") {
				updatedItem.description = description;
			}

			await Cache.set(key, updatedItem, 50000);
			console.log('Todo Item updated');

			return updatedItem;
		}catch(e){
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

  console.log(`Server running on ${server.info.uri}`);
};

start();
