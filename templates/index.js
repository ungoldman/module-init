var mustache = require('micromustache')
var path = require('path')
var fs = require('fs')

function getTemplate (tpl) {
  var template = function (data) {
    var filename = tpl.file
    var filePath

    switch (filename) {
      case 'LICENSE':
        filePath = path.join(__dirname, filename, data.pkgLicense + '.mustache')
        break
      default:
        filePath = path.join(__dirname, filename + '.mustache')
    }

    var fileContent = fs.readFileSync(filePath, 'utf8')
    return mustache.render(fileContent, data)
  }

  tpl.template = template
  return tpl
}

module.exports = [
  {
    file: '.gitignore',
    name: 'pkgGitignore'
  },
  {
    file: '.travis.yml',
    name: 'pkgTravis'
  },
  {
    file: 'CHANGELOG.md',
    name: 'pkgChangelog'
  },
  {
    file: 'CONTRIBUTING.md',
    name: 'pkgContributing'
  },
  {
    file: 'LICENSE',
    name: 'pkgLicense'
  },
  {
    file: 'README.md',
    name: 'pkgReadme'
  },
  {
    file: 'package.json',
    name: 'pkgJson'
  }
].map(getTemplate)
