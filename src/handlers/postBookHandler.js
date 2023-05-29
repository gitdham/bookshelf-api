const { nanoid } = require("nanoid")
const books = require("../books")

const postBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  const id = nanoid(16)
  const finished = readPage === pageCount
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt,
  }

  // If no name in request body return error 400
  if (!name) {
    const responseBody = {
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    }

    const response = h.response(responseBody)
    response.code(400)
    return response
  }

  // If readPage greater than pageCount in request body return error 400
  if (readPage > pageCount) {
    const responseBody = {
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    }

    const response = h.response(responseBody)
    response.code(400)
    return response
  }

  // insert new book to books list
  books.push(newBook)
  const isSuccess = books.filter((book) => book.id === id).length > 0

  // If newBook failed to store in books return error 500
  if (!isSuccess) {
    const responseBody = {
      status: 'fail',
      message: 'Buku gagal ditambahkan'
    }

    const response = h.response(responseBody)
    response.code(500)
    return response
  }

  // Success response
  const responseBody = {
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    }
  }

  const response = h.response(responseBody)
  response.code(201)
  return response
}

module.exports = { postBookHandler }
