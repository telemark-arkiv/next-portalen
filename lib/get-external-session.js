'use strict'

const config = require('../config')
const axios = require('axios')
const encryptor = require('simple-encryptor')(config.ENCRYPTOR_SECRET)
const jws = require('jws')
const buildSession = require('./build-session')

module.exports = receivedToken => {
  return new Promise((resolve, reject) => {
    const decoded = jws.decode(receivedToken)
    const verified = jws.verify(receivedToken, 'HS256', config.JWT_SECRET)
    if (verified) {
      const jwtData = encryptor.decrypt(decoded.payload.data)
      const sessionUrl = `${config.SESSION_STORAGE_URL}/${jwtData.session}`

      axios.get(sessionUrl)
        .then(result => {
          const user = encryptor.decrypt(result.data.value)
          const data = buildSession(user)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    } else {
      reject(new Error('Invalid token'))
    }
  })
}
