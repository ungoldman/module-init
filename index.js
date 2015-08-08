var fs = require('fs')
var path = require('path')
var util = require('util')
var extend = util._extend
var EventEmitter = require('events').EventEmitter
var camelCase = require('camel-case')
var cd = require('shelljs').cd
var exec = require('shelljs').exec
var fixpack = require('fixpack')
var mkdirp = require('mkdirp')
var templates = require('./templates')

var OPTIONS = {
  required: [
    'pkgName',
    'usrName',
    'usrEmail',
    'usrGithub'
  ],
  valid: {
    pkgLicense: ['ISC', 'Apache-2.0'],
    pkgLinter: ['standard', 'semistandard']
  },
  defaults: {
    'dir': process.cwd(),
    'pkgContributing': true,
    'pkgLicense': 'ISC',
    'pkgLinter': 'standard',
    'pkgVersion': '1.0.0'
  }
}

function ModuleInit (data, cb) {
  if (!(this instanceof ModuleInit)) return new ModuleInit(data, cb)
  this.set(data)
  this.cb = cb || function noop () {}
}

util.inherits(ModuleInit, EventEmitter)

ModuleInit.OPTIONS = OPTIONS

ModuleInit.prototype.set = function set (data) {
  var defaults = extend({}, OPTIONS.defaults)
  if (this.data) extend(this.data, data || {})
  else this.data = extend(defaults, data || {})
}

ModuleInit.prototype.validate = function validate () {
  var data = this.data
  var missing = []
  var invalid = []

  function checkMissing (opt) {
    if (!data[opt]) missing.push(opt)
  }

  function validateInput (opt) {
    if (OPTIONS.valid[opt].indexOf(data[opt]) === -1) {
      invalid.push(opt)
    }
  }

  OPTIONS.required.forEach(checkMissing)
  Object.keys(OPTIONS.valid).forEach(validateInput)

  return {
    invalid: invalid,
    missing: missing
  }
}

ModuleInit.prototype.run = function run () {
  var cwd = process.cwd()
  var differentDir = this.data.dir !== cwd
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

  if (differentDir) {
    mkdirp.sync(this.data.dir)
    cd(this.data.dir)
  }

  exec('git init')

  templates.forEach(createFileFromTemplate.bind(this))
  createIndex.apply(this)
  createTestDir.apply(this)
  fixpack(path.resolve('package.json'), { quiet: true })

  exec('npm install')

  if (differentDir) cd(cwd)

  this.emit('done', this.data)
  return this.cb(null, this.data)
}

function createFileFromTemplate (tpl) {
  if (this.data[tpl.name] === false) return

  var filePath = path.resolve(tpl.file)

  if (fs.existsSync(filePath)) {
    return this.emit('warn', tpl.file + ' already exists')
  }

  fs.writeFileSync(filePath, tpl.template(this.data))

  this.emit('create', tpl.file)
}

function createIndex () {
  var filePath = path.resolve('index.js')

  if (fs.existsSync(filePath)) {
    return this.emit('warn', 'index.js already exists')
  }

  fs.writeFileSync(filePath, '\n')
  this.emit('create', 'index.js')
}

function createTestDir () {
  var dirPath = path.resolve('test')
  var filePath = path.resolve('test/index.js')

  if (fs.existsSync(filePath)) {
    return this.emit('warn', 'test/index.js already exists')
  }

  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath)

  fs.writeFileSync(filePath, '\n')
  this.emit('create', 'test/index.js')
}

module.exports = ModuleInit
