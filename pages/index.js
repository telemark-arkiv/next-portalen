'use strict'

import React from 'react'
import Head from '../components/head'

export default class Index extends React.Component {

  static async getInitialProps (ctx) {
    const session = {
      user: {
        displayName: 'Tøffen'
      }
    }
    return {session: session}
  }

  render () {
    return (
      <html>
        <Head />
        <div>
          <h1>Hallo, {this.props.session.user.displayName}</h1>
        </div>
      </html>
    )
  }
}
