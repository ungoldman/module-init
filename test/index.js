var init = require('..')
var test = require('tape')

test('init', function (t) {
  t.plan(1)

  init(function (err, res) {
    if (err) throw err
    t.equal(res, 'everything\'s great I took care of it all, time to relax')
  })
})
