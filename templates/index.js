var mustache = require('micromustache')
var path = require('path')
var fs = require('fs')

function getTemplate (file) {
  var filePath = path.join(__dirname, file + '.mustache')
  var fileContent = fs.readFileSync(filePath, 'utf8')
  var template = function (data) {
    return mustache.render(fileContent, data)
  }
  template.filename = file
  return template
}

module.exports = [
  '.gitignore',
  '.travis.yml',
  'CHANGELOG.md',
  'CONTRIBUTING.md',
  'LICENSE.md',
  'README.md',
  'package.json'
].map(getTemplate)
