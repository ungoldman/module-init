module.exports = changelog
changelog.filename = 'CHANGELOG.md'

function changelog (data, type) {
  return `# ${data.pkgName} change log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased
* engage
`
}
