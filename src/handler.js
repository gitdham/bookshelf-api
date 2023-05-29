const { nanoid } = require("nanoid")
const books = require("./books")

// POST new book route handler
const addBookHandler = (request, h) => {
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

// GET all books route handler
const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query

  // Filter books by name if name query parameter exist
  if (name) {
    const filteredBooks = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
      .map((book) => ({ id: book.id, name: book.name, publisher: book.publisher }))

    const responseBody = {
      status: 'success',
      data: { books: filteredBooks }
    }

    const response = h.response(responseBody)
    return response
  }

  // Filter books by reading state if reading query parameter exist
  if (reading) {
    const readingState = Boolean(Number(reading))
    const filteredBooks = books.filter((book) => book.reading === readingState)
      .map((book) => ({ id: book.id, name: book.name, publisher: book.publisher }))

    const responseBody = {
      status: 'success',
      data: { books: filteredBooks }
    }

    const response = h.response(responseBody)
    return response
  }

  // Filter books by finished state if finished query parameter exist
  if (finished) {
    const finishedgState = Boolean(Number(finished))
    const filteredBooks = books.filter((book) => book.finished === finishedgState)
      .map((book) => ({ id: book.id, name: book.name, publisher: book.publisher }))

    const responseBody = {
      status: 'success',
      data: { books: filteredBooks }
    }

    const response = h.response(responseBody)
    return response
  }

  // Default return of all books
  const responseBody = {
    status: 'success',
    data: {
      books: books.map((book) => ({ id: book.id, name: book.name, publisher: book.publisher }))
    }
  }

  const response = h.response(responseBody)
  return response
}

// GET selected book by bookId
const getBookByIdHandler = (request, h) => {
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

// PUT selected book by bookId
const editBookByIdHandler = (request, h) => {
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

// DELETE selected book by bookId
const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params

  // check existed bookId
  const index = books.findIndex((book) => book.id === bookId)
  // return 404 response if bookId not exist in books list
  if (index === -1) {
    const responseBody = {
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
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
    message: 'Buku berhasil dihapus'
  }

  const response = h.response(responseBody)
  response.code(200)
  return response
}

module.exports = {
  getAllBooksHandler,
  addBookHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler
}
