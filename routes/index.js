'use strict'

const handlers = require('../handlers')

module.exports = [
  {
    method: 'GET',
    path: '/login',
    handler: handlers.doLogin,
    config: {
      auth: false,
      description: 'Handle login'
    }
  },
  {
    method: 'GET',
    path: '/ping',
    handler: handlers.doPing,
    config: {
      auth: false,
      description: 'Ping me'
    }
  },
  {
    method: 'GET',
    path: '/logout',
    handler: handlers.doLogout,
    config: {
      description: 'Log me out'
    }
  }
]
