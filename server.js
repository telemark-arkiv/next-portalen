'use strict'

const os = require('os')
const NodeSession = require('node-session')

const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const { send } = require('micro')
const micro = require('micro')

const getExternalSession = require('./lib/get-external-session')
const config = require('./config')

const sessionOptions = {
  secret: config.SESSION_SECRET,
  files: `${os.tmpdir()}/sessions`,
  driver: 'file'
}

const session = new NodeSession(sessionOptions)

app.prepare()
  .then(() => {
    const server = micro(async (request, response) => {
      session.startSession(request, response, async () => {
        const parsedUrl = parse(request.url, true)
        const { pathname, query } = parsedUrl

        if (pathname === '/auth/session') {
          const sess = request.session.get('data') || {}
          send(response, 200, sess)
        } else if (pathname === '/auth/csrf') {
          const token = request.session.getToken()
          send(response, 200, {csrfToken: token})
        } else if (pathname === '/auth/login') {
          const jwt = query.jwt
          const data = await getExternalSession(jwt)
          request.session.put('data', data)
          response.writeHead(302, { Location: '/' })
          response.end()
        } else if (pathname === '/auth/logout') {
          request.session.flush()
          send(response, 200, 'logged out')
        } else if (pathname === '/ping') {
          send(response, 200, 'pong')
        } else {
          handle(request, response, parsedUrl)
        }
      })
    })

    server.listen(3000)
  })
