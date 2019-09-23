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
          partition : 'todo_list_cached_data',
        }
      }
    }
  ]
});

const Cache = server.cache({ segment: 'todo_list', expiresIn: 1000 * 5 });

server.route({
  method: 'GET',
  path: '/',
  handler: async (request, h) => {

  }
});

const start = async function () {

  try {
    await server.start();
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log(`Server running on ${server.info.uri}`);
};

start();
