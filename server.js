// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 3001;

server.use(middlewares);
server.use(auth);
// Add this before server.use(router)
server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id',
  }),
);
server.use(router);
server.listen(PORT, () => {
  console.log('JSON Server is running');
});

// Export the Server API
module.exports = server;
