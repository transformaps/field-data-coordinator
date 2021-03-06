const config = require('../config')
module.exports = {
  dir: config.dir,
  arch: 'all',
  asar: true,
  platform: 'win32',
  icon: config.iconPath + '.icns',
  out: config.out,
  tmpdir: false,
  electronVersion: config.electronVersion,
  appVersion: config.version,
  buildVersion: config.version,
  prune: true,
  overwrite: true,
  'version-string': {
    ProductName: config.appName,
    CompanyName: config.teamName
  }
}
