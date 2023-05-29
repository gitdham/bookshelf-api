const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: () => {
      return {
        status: 'success',
        data: 'Ini buku'
      }
    }
  }
]

module.exports = routes
