var fs = require('fs')
var path = require('path')
var camelCase = require('camel-case')
var chalk = require('chalk')
var fixpack = require('fixpack')
var exec = require('shelljs').exec
var templates = require('./templates')

module.exports = init

function init (data, cb) {
  if (!data ||
      !data.pkgName ||
      !data.pkgLicense ||
      !data.pkgContributing ||
      !data.usrName ||
      !data.usrEmail ||
      !data.usrGithub
    ) return cb('invalid data')

  data.nodeName = camelCase(data.pkgName)
  data.year = new Date().getFullYear()

  console.log('\n> git init\n')

  exec('git init')

  console.log('\nCreating files...\n')

  templates.forEach(createFileFromTemplate.bind(data))

  fixpack(path.join(process.cwd(), 'package.json'), { quiet: true })

  createTestFile()
  createIndexFile()

  console.log('\n> npm install\n')

  exec('npm install')

  cb(null, data.pkgName)
}

function createFileFromTemplate (tpl) {
  var filePath = path.join(process.cwd(), tpl.filename)

  if (fs.existsSync(filePath)) {
    return console.log(chalk.red(tpl.filename + ' already exists'))
  }

  fs.writeFileSync(filePath, tpl(this))

  console.log(chalk.green('Created ' + tpl.filename))
}

function createTestFile () {
  var dirPath = path.join(process.cwd(), 'test')
  var filePath = path.join(process.cwd(), 'test', 'index.js')

  if (fs.existsSync(filePath)) {
    return console.log(chalk.red('test/index.js already exists'))
  }

  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath)

  fs.writeFileSync(filePath, '\n')
  console.log(chalk.green('Created test/index.js'))
}

function createIndexFile () {
  var filePath = path.join(process.cwd(), 'index.js')

  if (fs.existsSync(filePath)) {
    return console.log(chalk.red('index.js already exists'))
  }

  fs.writeFileSync(filePath, '\n')
  console.log(chalk.green('Created index.js'))
}
