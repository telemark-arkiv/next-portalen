'use strict'

import Link from 'next/link'
import React from 'react'
import withSession from '../components/with-session'
import LogoutButton from '../components/logout-button'
import Head from '../components/head'

const Index = ({ session, isLoggedIn }) => {
  return (
    <div>
      <Head />
      <h1>Velkommen {session.user.displayName}</h1>
      <div>
        <LogoutButton session={session}>Logg ut</LogoutButton>
      </div>
      <p><Link prefetch href='/restricted-page'><a>Restricted page</a></Link></p>
    </div>
  )
}

// withSession can only be used on top level components (routes inside the pages directory)
export default withSession(Index)
