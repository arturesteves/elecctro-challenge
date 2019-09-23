const listItem = (request, h) => {
  const params = request.query;
  console.log(`query params: ${JSON.stringify(params)}`);

  return 'Hello World!';
};

module.exports = listItem;