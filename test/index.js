var moduleInit = require('..')
var test = require('tape')
var d = Date.now()
var testData = {
  pkgName: `tmp-${d}`,
  pkgDescription: 'desc',
  pkgLicense: 'ISC',
  pkgContributing: 'Open-2',
  usrName: 'BOB',
  usrEmail: 'BOB@hotmail.com',
  usrGithub: 'BOB',
  usrNpm: 'BOB'
}

test('error on missing options', function (t) {
  t.plan(1)

  var required = [
    'pkgName',
    'pkgLicense',
    'pkgContributing',
    'usrName',
    'usrEmail',
    'usrGithub'
  ]

  moduleInit()
    .on('err', function (err) {
      var match = err.message.match('missing required options: ' + required.join(', '))
      t.ok(match, 'returned missing options')
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
