# module-init change log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased
* fix --version flag ([#28](https://github.com/ngoldman/module-init/pull/28))

## [1.3.3] - 2015-09-30
* add 0.10 and 0.12 back to travis
* remove redundant `script` section of travis (default is already `npm test`)

## [1.3.2] - 2015-09-22
* remove can-haz-package from dependencies (oops)
* fix bad reference to `package.json`

## [1.3.1] - 2015-09-22
* hide contributing section if no pkgContributing ([#24](https://github.com/ngoldman/module-init/pull/24))
* default to stable node for `.travis.yml`
* remove can-haz-package validation due to issue ([#23](https://github.com/ngoldman/module-init/issues/23))
* no errant newlines in readme if description omitted

## 1.3.0 - 2015-08-10
* Remove errant newline in ISC template ([#22](https://github.com/ngoldman/module-init/pull/22))
* Add `dir` option to specify directory
* Fix missing `pkgVersion` default

## 1.2.1 - 2015-08-05
* Change `LICENSE.md` to `LICENSE` in all the places

## 1.2.0 - 2015-08-04
* Validate package name with [can-haz-package](https://github.com/flet/can-haz-package)

## 1.1.1 - 2015-07-18
* Fix typo in CONTRIBUTING.md & CONTRIBUTING.md.mustache

## 1.1.0 - 2015-07-05

### Added
* CLI now has `--version` and `--help` arguments

## 1.0.1 - 2015-07-01

### Changed
* Updated contributing guidelines & template based on changes in [ngoldman/contributing@b1f54df](https://github.com/ngoldman/contributing/commit/b1f54df669d02e1db87598bc07540d823b423d4d).

### Fixed
* Use `tap-spec` 4.x to fix rendering issues ([#16](https://github.com/ngoldman/module-init/issues/16))

## 1.0.0 - 2015-06-15

### Changed
* Refactored object returned by `templates/index.js` to deal with fix for ([#13](https://github.com/ngoldman/module-init/issues/13))

### Fixed
* remove `pkgContributing` from required list, default to true
* fix error when selecting 'No' for contributing ([#13](https://github.com/ngoldman/module-init/issues/13))

## 0.3.2
* use github's [node `.gitignore`](https://github.com/github/gitignore/edit/master/Node.gitignore)
* improve `CONTRIBUTING.md` to be useful for contributors as well as collaborators
* switch from `faucet` to `tap-spec` for tap output ([#12](https://github.com/ngoldman/module-init/issues/12))

## 0.3.1
* change `standard` devDep to always use latest ([#7](https://github.com/ngoldman/module-init/issues/7))
* add linter options ([#8](https://github.com/ngoldman/module-init/issues/8))

## 0.3.0

### Added
* add `Apache-2.0` license option
* add validation for license options
* add test for invalid option error
* add and expose `moduleInit.OPTIONS` constant
* add default license (ISC)

### Removed
* remove license from required list

### Changed
* public method `moduleInit.validate()` returns `{ missing, invalid }` object instead of `missing` array
* improve CLI feedback
* update dependencies

## 0.2.0
* switch Node API to EventEmitter pattern
* remove io.js dependency ([#6](https://github.com/ngoldman/module-init/issues/6))
* add node 0.10 & 0.12 to travis tests
* add stability index badge as fair warning

## 0.1.5
* fix keywords again
* add [`fixpack`](https://github.com/HenrikJoreteg/fixpack/) step
* add `npm install` step
* add implementation table to readme

## 0.1.4
* move `.gitconfig` checks before prompt ([#2](https://github.com/ngoldman/module-init/issues/2))

## 0.1.3
* fix missing module
* skip unimplemented test

## 0.1.2
* add colors to creation process
* slight improvement to tests
* always exit process in bin
* catch git config errors
* nix repo creation
* desc no longer has default
* fixed keywords & added back
* removed unused npmUsr variable

## 0.1.1
* add newline to blank `index.js` & `test/index.js`
* remove fake github repo confirmation & creation
* removed unused dependency (mkdirp)
* disable keywords for now

## 0.1.0
* working draft

[1.3.3]: https://github.com/ngoldman/module-init/compare/v1.3.2...v1.3.3
[1.3.2]: https://github.com/ngoldman/module-init/compare/v1.3.1...v1.3.2
[1.3.1]: https://github.com/ngoldman/module-init/compare/v1.3.0...v1.3.1
