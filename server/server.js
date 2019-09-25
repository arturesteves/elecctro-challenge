const Hapi = require('@hapi/hapi');
const Database = require("./Database");
const addItem = require('./handlers/addItem');
const listItems = require('./handlers/listItems');
const editItem = require('./handlers/editItem');
const deleteItem = require('./handlers/deleteItem');

const server = Hapi.server({
	port: 3000,
	host: 'localhost',
	cache: [ Database.options ]
});

const db = new Database(server);

server.route(addItem(db));
server.route(listItems(db));
server.route(editItem(db));
server.route(deleteItem(db));

const start = async function () {
	try {
		await server.start();
	} catch (err) {
		console.log(err);
		process.exit(1);
	}

	console.log(`Server running on ${ server.info.uri }`);
};

start();
