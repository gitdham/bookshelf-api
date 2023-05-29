const books = require("../books")

const putBookHandler = (request, h) => {
  const { bookId } = request.params

  // check existed bookId
  const index = books.findIndex((book) => book.id === bookId)
  // return 404 response if bookId not exist in books list
  if (index === -1) {
    const responseBody = {
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    }

    const response = h.response(responseBody)
    response.code(404)
    return response
  }


  // setup data for book update
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  const finished = readPage === pageCount
  const updatedAt = new Date().toISOString()

  // If no name in request body return error 400
  if (!name) {
    const responseBody = {
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    }

    const response = h.response(responseBody)
    response.code(400)
    return response
  }

  // If readPage greater than pageCount in request body return error 400
  if (readPage > pageCount) {
    const responseBody = {
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    }

    const response = h.response(responseBody)
    response.code(400)
    return response
  }

  // update selected book with new data
  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    updatedAt
  }

  // return success response
  const responseBody = {
    status: 'success',
    message: 'Buku berhasil diperbarui'
  }

  const response = h.response(responseBody)
  response.code(200)
  return response
}

module.exports = { putBookHandler }
