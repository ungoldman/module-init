module.exports = gitignore
gitignore.node = node

function gitignore (data) {
  return node(data)
}

function node (data) {
  return `node_modules
`
}
