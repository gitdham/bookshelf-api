const books = require("../books")

const getBookHandler = (request, h) => {
  const { name = '', reading = '', finished = '' } = request.query

  // filtering and mutating books data
  const indexBooks = books
    .filter((book) => {
      // if name not empty filter books by name
      if (name !== '') return book.name.toLowerCase().includes(name.toLowerCase())
      else return book
    })
    .filter((book) => {
      // if reading is 1 or 0 filter books by reading status
      if (reading === '1' || reading === '0')
        return (reading === '1' && book.reading) || (reading === '0' && !book.reading)
      else return book
    })
    .filter((book) => {
      // if finished is 1 or 0 filter books by finished status
      if (finished === '1' || finished === '0')
        return (finished === '1' && book.finished) || (finished === '0' && !book.finished)
      else return book
    })
    .map((book) => ({ id: book.id, name: book.name, publisher: book.publisher }))

  // Return response books data
  const responseBody = {
    status: 'success',
    data: {
      books: indexBooks
    }
  }

  const response = h.response(responseBody)
  return response
}

module.exports = { getBookHandler }
