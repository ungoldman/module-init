var moduleInit = require('..')
var test = require('tape')
var rimraf = require('rimraf')
var spawn = require('win-spawn')
var fs = require('fs')
var path = require('path')
var util = require('util')

var d = Date.now()
var testData = {
  pkgName: util.format('tmp-%s', d),
  pkgDescription: 'desc',
  pkgLicense: 'ISC',
  pkgContributing: true,
  pkgKeywords: '"hello", "world"',
  pkgLinter: 'standard',
  usrName: 'BOB',
  usrEmail: 'BOB@hotmail.com',
  usrGithub: 'BOB',
  usrNpm: 'BOB',
  dir: 'test/dummy-module'
}
var badData = {
  pkgName: util.format('tmp-%s', d),
  pkgDescription: 'desc',
  pkgLicense: 'klaatu',
  pkgContributing: 'niktu',
  pkgLinter: 'barada',
  usrName: 'BOB',
  usrEmail: 'BOB@hotmail.com',
  usrGithub: 'BOB',
  usrNpm: 'BOB',
  dir: 'test/dummy-module'
}

test('emit err on missing option', function (t) {
  t.plan(1)

  var required = moduleInit.OPTIONS.required.join(', ')

  moduleInit()
    .on('err', function (err) {
      var match = err.message.match('missing required options: ' + required)
      t.ok(match, 'returned missing required options: ' + required)
      t.end()
    })
    .run()
})

test('emit err on invalid option', function (t) {
  t.plan(1)

  var invalid = Object.keys(moduleInit.OPTIONS.valid).join(', ')

  moduleInit(badData)
    .on('err', function (err) {
      var match = err.message.match('invalid options: ' + invalid)
      t.ok(match, 'returned invalid options: ' + invalid)
      t.end()
    })
    .run()
})

test('create things as expected', function (t) {
  moduleInit(testData)
    .on('create', function (file) {
      // file created
      console.log(file + ' created')
    })
    .on('warn', function (msg) {
      console.log(msg)
    })
    .on('err', function (err) {
      t.error(err, 'did not error')
    })
    .on('done', function (res) {
      console.log(res.pkgName + ' initialized')
      var file = path.resolve('test/dummy-module/package.json')
      var exists = fs.existsSync(file)
      console.log(file, exists)
      t.ok(res, 'got response')
      t.ok(exists, 'directory exists')
      rimraf.sync('test/dummy-module')
      t.end()
    })
    .run()
})

test('CLI --version flag works correctly', function (t) {
  var version = spawn(path.join(__dirname, '../bin/cli.js'), ['--version'], {stdio: 'inherit'})

  version.on('close', function (code) {
    t.equals(code, 0, 'should return error code 0 (success)')
    t.end()
  })
})
