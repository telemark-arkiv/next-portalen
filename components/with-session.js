'use strict'

import React from 'react'
import Session from './session'
const config = require('../config')

export default (Component) => class extends React.Component {
  static async getInitialProps (ctx) {
    const session = new Session({ req: ctx.req })

    let initialProps = {}
    if (Component.getInitialProps) {
      initialProps = Component.getInitialProps({ ...ctx, session })
    }

    const sessionData = await session.getSession()
    let isLoggedIn = false
    if (sessionData.user && sessionData.user.id) {
      isLoggedIn = true
    }

    if (!isLoggedIn) {
      const url = `${config.SSO_URL}?origin=${config.ORIGIN_URL}`
      if (typeof window !== 'undefined') {
        window.location = url
      } else {
        ctx.res.writeHead(302,
          {Location: url}
        )
        ctx.res.end()
      }
    }

    return {session: sessionData, isLoggedIn, ...initialProps}
  }

  render () {
    return <Component {...this.props} />
  }
}
