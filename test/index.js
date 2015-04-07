var init = require('..')
var test = require('tape')
var d = Date.now()
var testData = {
  pkgName: `testPkg-${d}`,
  pkgDescription: 'desc',
  pkgLicense: 'ISC',
  pkgContributing: 'Open-2',
  usrName: 'BOB',
  usrEmail: 'BOB@hotmail.com',
  usrGithub: 'BOB',
  usrNpm: 'BOB'
}

test('error on invalid data', function (t) {
  t.plan(1)

  init({}, function (err, res) {
    t.equal(err, 'invalid data')
    t.end()
  })
})

test('create things as expected', function (t) {
  t.plan(1)

  init(testData, function (err, res) {
    t.error(err)
    t.res(`created ${testData.pkgName}`)
    t.end()
  })
})
