const books = require('../books')

const deleteBookHandler = (request, h) => {
  const { bookId } = request.params

  // check existed bookId
  const index = books.findIndex((book) => book.id === bookId)
  // return 404 response if bookId not exist in books list
  if (index === -1) {
    const responseBody = {
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    }

    const response = h.response(responseBody)
    response.code(404)
    return response
  }

  // delete selected book
  books.splice(index, 1)

  // return success response
  const responseBody = {
    status: 'success',
    message: 'Buku berhasil dihapus',
  }

  const response = h.response(responseBody)
  response.code(200)
  return response
}

module.exports = { deleteBookHandler }
