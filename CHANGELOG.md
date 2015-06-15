# module-init change log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased

### Fixes
* remove `pkgContributing` from required list, default to true

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
