var templates = require('./templates')

module.exports = init

var pkg = {}

pkg.name          // package.json name
pkg.license       // default is ISC
pkg.contributing  // default is open-2

var node = {}

node.name         // package name formatted for node (camel case, no dashes)

var user = {}

user.name         // your name here
user.email        // user email
user.github       // username on github
user.npm          // username on npm

function init (cb) {
  console.log(templates)
  cb(null, 'everything\'s great I took care of it all, time to relax')
}
