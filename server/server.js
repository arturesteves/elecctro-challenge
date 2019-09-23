const Hapi = require('@hapi/hapi');
const listItem = require('./handlers/listItems');
const CatboxMemory = require('@hapi/catbox-memory');

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
      const { filter = 'ALL', orderBy = 'DATE_ADDED' } = request.query;
      console.log(`Query params received ${JSON.stringify(request.query)}`);

      const key = {
        segment: cacheSegmenet,
        id: newTodoItem.id
      };

      const cachedTodoItem = await Cache.get(key);


      return [];
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
