const {
  postBookHandler,
  getBookHandler,
  putBookHandler,
  deleteBookHandler,
  showBookHandler,
} = require('./handlers')

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: postBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getBookHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: showBookHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: putBookHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookHandler,
  },
]

module.exports = routes
