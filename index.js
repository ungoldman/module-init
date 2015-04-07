var fs = require('fs')
var path = require('path')
var exec = require('shelljs').exec
var camelCase = require('camel-case')
var templates = require('./templates')

module.exports = init

function init (data, cb) {
  if (!data ||
      !data.pkgName ||
      !data.pkgDescription ||
      !data.pkgLicense ||
      !data.pkgContributing ||
      !data.usrName ||
      !data.usrEmail ||
      !data.usrGithub
    ) return cb('invalid data')

  data.nodeName = camelCase(data.pkgName)

  exec('git init')

  data.year = new Date().getFullYear()

  templates.forEach(createFileFromTemplate.bind(data))

  createTestFile()
  createIndexFile()

  cb(null, data.pkgName)
}

function createFileFromTemplate (tpl) {
  var filePath = path.join(process.cwd(), tpl.filename)

  if (fs.existsSync(filePath)) {
    return console.log(`${tpl.filename} already exists`)
  }

  fs.writeFileSync(filePath, tpl(this))

  console.log(`Created ${tpl.filename}`)
}

function createTestFile () {
  var dirPath = path.join(process.cwd(), 'test')
  var filePath = path.join(process.cwd(), 'test', 'index.js')

  if (fs.existsSync(filePath)) {
    return console.log('test/index.js already exists')
  }

  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath)

  fs.writeFileSync(filePath, '\n')
  console.log('Created test/index.js')
}

function createIndexFile () {
  var filePath = path.join(process.cwd(), 'index.js')

  if (fs.existsSync(filePath)) {
    return console.log('index.js already exists')
  }

  fs.writeFileSync(filePath, '\n')
  console.log('Created index.js')
}
