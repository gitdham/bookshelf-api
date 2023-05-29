const books = require("../books")

const showBookHandler = (request, h) => {
  const { bookId } = request.params

  // check existed bookId
  const book = books.filter((book) => book.id === bookId)[0]
  // return 404 response if bookId not exist in books list
  if (!book) {
    const responseBody = {
      status: 'fail',
      message: 'Buku tidak ditemukan'
    }

    const response = h.response(responseBody)
    response.code(404)
    return response
  }

  // return response with selected book
  const responseBody = {
    status: 'success',
    data: { book }
  }

  const response = h.response(responseBody)
  return response
}

module.exports = { showBookHandler }
