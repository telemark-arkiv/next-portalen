'use strict'

module.exports = data => {
  return {
    user: {
      displayName: data.displayName || data.cn || '',
      id: data.sAMAccountName || data.uid || '',
      company: data.company || '',
      department: data.department || ''
    }
  }
}
