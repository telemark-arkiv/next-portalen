'use strict'

const next = require('next')
const Hapi = require('hapi')
const Good = require('good')
const Yar = require('yar')
const hapiAuthCookie = require('hapi-auth-cookie-issamesite-patch')
const { defaultHandlerWrapper } = require('./next-wrapper')
const validateSession = require('./lib/validate-session')
const config = require('./config')
const routes = require('./routes')

const yarOptions = {
  storeBlank: false,
  cookieOptions: {
    password: config.YAR_SECRET,
    isSecure: process.env.NODE_ENV !== 'development',
    isSameSite: 'Lax'
  }
}

const goodOptions = {
  reporters: {
    console: [{
      module: 'good-console'
    }, 'stdout']
  }
}

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const server = new Hapi.Server()

// add request logging (optional)
const pluginOptions = [
  {register: Good, options: goodOptions},
  {register: Yar, options: yarOptions},
  {register: hapiAuthCookie}
]

app.prepare()
  .then(() => {
    server.connection({ port: 3000 })
    server.register(pluginOptions)
      .then(() => {
        server.auth.strategy('session', 'cookie', {
          password: config.COOKIE_SECRET,
          cookie: 'tilskudd-session',
          validateFunc: validateSession,
          redirectTo: `${config.SSO_URL}?origin=${config.ORIGIN_URL}`,
          isSecure: process.env.NODE_ENV !== 'development',
          isSameSite: 'Lax'
        })

        server.auth.default('session')

        server.route(routes)

        server.route({
          method: 'GET',
          path: '/{p*}', /* catch all route */
          handler: defaultHandlerWrapper(app)
        })

        server.start().catch(error => {
          console.log('Error starting server')
          console.log(error)
        }).then(() => {
          console.log('> Ready on http://localhost:3000')
        })
      })
  })
