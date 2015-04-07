var init = require('..')
var test = require('tape')
var testData = {}

test('error on bad data', function (t) {
  t.plan(1)
  // error on init if data invalid

  // create temp dir

  init({}, function (err, res) {
    t.error(err)
  })
})

test('create things as expected', function (t) {
  t.plan(1)
  // error on init if data invalid

  // create temp dir

  init(testData, function (err, res) {
    t.error(err)
  })
})
