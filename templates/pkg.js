module.exports = pkg
pkg.filename = 'package.json'

function pkg (data) {
  return `{
  "name": "${data.pkgName}",
  "description": "${data.pkgDescription}",
  "version": "${data.pkgVersion}",
  "author": "${data.usrName} <${data.usrEmail}>",
  "bugs": {
    "url": "https://github.com/${data.usrGithub}/${data.pkgName}/issues"
  },
  "devDependencies": {
    "faucet": "0.0.1",
    "standard": "^3.3.2",
    "tape": "^4.0.0"
  },
  "homepage": "https://github.com/${data.usrGithub}/${data.pkgName}",
  "license": "${data.pkgLicense}",
  "keywords": [${data.pkgKeywords}],
  "main": "index.js",
  "repository": {
    "type": "git",
    "url": "https://github.com/${data.usrGithub}/${data.pkgName}.git"
  },
  "scripts": {
    "test": "standard && faucet"
  }
}
`
}
