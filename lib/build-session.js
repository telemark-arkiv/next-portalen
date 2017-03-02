'use strict'

module.exports = data => {
  return {
    expires: new Date().getTime() + 1000,
    user: {
      displayName: data.displayName || data.cn || '',
      id: data.sAMAccountName || data.uid || '',
      company: data.company || '',
      department: data.department || ''
    }
  }
}
