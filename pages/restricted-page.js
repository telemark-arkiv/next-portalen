'use strict'

import Link from 'next/link'
import restricted from '../components/restricted'
import Head from '../components/head'
import Container from 'muicss/lib/react/container'
import Appbar from 'muicss/lib/react/appbar'

const RestrictedPage = () => (
  <div>
    <Head />
      <Appbar />
    <Container>
    <h1>Restricted page</h1>
    <p>This page is restricted to the public. Since you&#39;re logged in you see this message.</p>
    <Link prefetch href='/'><a>Back to homepage</a></Link>
    </Container>
  </div>
)

// restricted can only be used on top level components (routes inside the pages directory)
export default restricted(RestrictedPage)
