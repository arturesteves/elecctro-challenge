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
const cacheSegmenet = 'todos';

server.route({
  method: 'PUT',
  path: '/todos',
  handler: async (request, h) => {
    try {
      const payload = request.payload;
      const { description } = payload;
      console.log('description', description);

      const newTodoItem = {
        id: generateRandomUniqueIdentifier().toString(),
        state: 'INCOMPLETE',
        description,
        dateAdded: new Date().toISOString()
      };
      console.log(`New Todo Item: ${ JSON.stringify(newTodoItem) }`);

      const key = {
        segment: cacheSegmenet,
        id: newTodoItem.id
      };

      await Cache.set(key, newTodoItem, 5000);
      console.log('Todo Item saved');

      return newTodoItem;
    }catch(e){
      console.log(e);
      return e;
    }
  }
});

const generateRandomUniqueIdentifier = () => {
  return Math.floor(Math.random() * 10000) + 1;
};

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
