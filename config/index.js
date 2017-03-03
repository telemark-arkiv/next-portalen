'use strict'

module.exports = {
  SSO_URL: process.env.SSO_URL || 'https://sso.router.t-fk.win',
  ORIGIN_URL: process.env.ORIGIN_URL || 'https://portalen.next.t-fk.win/auth/login',
  JWT_SECRET: process.env.JWT_SECRET || 'Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go',
  ENCRYPTOR_SECRET: process.env.ENCRYPTOR_SECRET || 'Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go',
  SESSION_SECRET: process.env.SESSION_SECRET || 'Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go',
  SESSION_STORAGE_URL: process.env.SESSION_STORAGE_URL || 'https://tmp.storage.service.t-fk.no',
  SERVICES: {
    roles: 'https://roles.portalen.t-fk.win',
    links: 'https://links.portalen.t-fk.win',
    shortcuts: 'https://shortcuts.portalen.t-fk.win',
    content: 'https://roles.portalen.t-fk.win',
    tasks: 'https://roles.portalen.t-fk.win',
    messages: 'https://roles.portalen.t-fk.win'
  }
}
