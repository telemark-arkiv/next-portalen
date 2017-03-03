'use strict'

import React from 'react'
const axios = require('axios')
const config = require('../config')

export default class Shortcuts extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      shortcuts: []
    }
  }

  async componentDidMount () {
    const url = `${config.SERVICES.shortcuts}/shortcuts?roles=${this.props.roles.join('|')}`
    const shortcuts = await axios.get(url)
    this.setState({shortcuts: shortcuts.data})
  }

  render () {
    return (
      <div>
        <ul className='mui-list--unstyled'>
          {this.state.shortcuts.map(shortcut => {
            return (
              <li className='mui--text-display1'><a href={shortcut.url} target='_blank'>{shortcut.title}</a></li>
            )
          })}
        </ul>
      </div>
    )
  }
}
