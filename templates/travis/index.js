module.exports = travis
travis.node = node

function travis (data) {
  return node(data)
}

function node (data) {
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
