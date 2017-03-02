'use strict'

import React from 'react'
import Session from './session'
import Button from 'muicss/lib/react/button'

async function logout (event) {
  event.preventDefault()

  const session = new Session()
  await session.signout()

  window.location = '/'
}

export default ({ session, children }) => {
  if (!session || !session.user) {
    return false
  }

  return (
    <form id='signout' method='post' action='/auth/logout' onSubmit={logout}>
      <input name='_csrf' type='hidden' value={session.csrfToken} />
      <Button color='danger' type='submit'>{children}</Button>
    </form>
  )
}
