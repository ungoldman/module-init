var moduleInit = require('..')
var test = require('tape')
var util = require('util')
var d = Date.now()
var testData = {
  pkgName: util.format('tmp-%s', d),
  pkgDescription: 'desc',
  pkgLicense: 'ISC',
  pkgContributing: 'Open-2',
  pkgLinter: 'standard',
  usrName: 'BOB',
  usrEmail: 'BOB@hotmail.com',
  usrGithub: 'BOB',
  usrNpm: 'BOB'
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
  usrNpm: 'BOB'
}

test('emit err on missing option', function (t) {
  t.plan(1)

  var required = moduleInit.OPTIONS.required.join(', ')

  moduleInit()
    .on('err', function (err) {
      var match = err.message.match('missing required options: ' + required)
      t.ok(match, 'returned missing options')
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
      t.ok(match, 'returned invalid options')
      t.end()
    })
    .run()
})

test.skip('create things as expected', function (t) {
  t.plan(1)

  moduleInit(testData)
    .on('err', function (err) {
      throw err
    })
    .on('done', function (res) {
      t.ok(res)
      t.end()
    })
    .run()
})
