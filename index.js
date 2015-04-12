var fs = require('fs')
var path = require('path')
var util = require('util')
var extend = util._extend
var EventEmitter = require('events').EventEmitter
var camelCase = require('camel-case')
var fixpack = require('fixpack')
var exec = require('shelljs').exec
var templates = require('./templates')

function ModuleInitializer (data, cb) {
  if (!(this instanceof ModuleInitializer)) return new ModuleInitializer(data, cb)
  this.set(data)
  this.cb = cb || function noop () {}
}

util.inherits(ModuleInitializer, EventEmitter)

ModuleInitializer.prototype.set = function set (data) {
  if (this.data) extend(this.data, data || {})
  else this.data = data || {}
}

ModuleInitializer.prototype.validate = function validate () {
  var data = this.data

  var missing = []
  var required = [
    'pkgName',
    'pkgLicense',
    'pkgContributing',
    'usrName',
    'usrEmail',
    'usrGithub'
  ]

  var invalid = []
  var expected = {
    pkgLicense: ['ISC', 'Apache-2.0']
  }

  required.forEach(function checkMissing (opt) {
    if (!data[opt]) missing.push(opt)
  })

  Object.keys(expected).forEach(function validateInput (opt) {
    if (expected[opt].indexOf(data[opt]) === -1) invalid.push(opt)
  })

  return {
    invalid: invalid,
    missing: missing
  }
}

ModuleInitializer.prototype.run = function run () {
  var errors = this.validate()
  var err

  if (errors.missing.length) {
    err = new Error('missing required options: ' + errors.missing.join(', '))
    this.emit('err', err)
    return this.cb(err)
  }

  if (errors.invalid.length) {
    err = new Error('invalid options: ' + errors.invalid.join(', '))
    this.emit('err', err)
    return this.cb(err)
  }

  this.data.nodeName = this.data.nodeName || camelCase(this.data.pkgName)
  this.data.year = this.data.year || new Date().getFullYear()

  exec('git init')

  templates.forEach(createFileFromTemplate.bind(this))
  createIndex.apply(this)
  createTestDir.apply(this)
  fixpack(local('package.json'), { quiet: true })

  exec('npm install')

  this.emit('done', this.data)
  return this.cb(null, this.data)
}

function createFileFromTemplate (tpl) {
  var filePath = local(tpl.filename)

  if (fs.existsSync(filePath)) {
    return this.emit('warn', tpl.filename + ' already exists')
  }

  fs.writeFileSync(filePath, tpl(this.data))

  this.emit('create', tpl.filename)
}

function createIndex () {
  var filePath = local('index.js')

  if (fs.existsSync(filePath)) {
    return this.emit('warn', 'index.js already exists')
  }

  fs.writeFileSync(filePath, '\n')
  this.emit('create', 'index.js')
}

function createTestDir () {
  var dirPath = local('test')
  var filePath = local('test', 'index.js')

  if (fs.existsSync(filePath)) {
    return this.emit('warn', 'test/index.js already exists')
  }

  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath)

  fs.writeFileSync(filePath, '\n')
  this.emit('create', 'test/index.js')
}

function local () {
  var args = Array.prototype.slice.call(arguments)
  args.unshift(process.cwd())
  return path.join.apply(null, args)
}

module.exports = ModuleInitializer
