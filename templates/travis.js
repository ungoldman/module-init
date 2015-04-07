module.exports = travis
travis.filename = '.travis.yml'

function travis (data) {
  return `language: node_js
node_js:
  - '0.12'
  - 'iojs'
sudo: false
cache:
  directories:
    - node_modules
script:
  - npm test
`
}
