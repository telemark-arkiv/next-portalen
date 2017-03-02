'use strict'

const axios = require('axios')
const config = require('../config')

module.exports = payload => {
  return new Promise((resolve, reject) => {
    const url = `${config.SERVICES.roles}/roles`
    axios.post(url, payload)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}
