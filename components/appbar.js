'use strict'

import Link from 'next/link'
import React from 'react'
import Appbar from 'muicss/lib/react/appbar'

export default () => (
  <Appbar>
    <table width='100%'>
      <tbody>
        <tr class='mui--appbar-height'>
          <td class='mui--text-title'>Portalen</td>
          <td align='right'>
            <Link prefetch href='/'><a>Hjem</a></Link>
            <Link prefetch href='/restricted-page'><a>Lukket område</a></Link>
          </td>
        </tr>
      </tbody>
    </table>
  </Appbar>
)
