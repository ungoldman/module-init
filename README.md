# module-init

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]

[npm-image]: https://img.shields.io/npm/v/module-init.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/module-init
[travis-image]: https://img.shields.io/travis/ngoldman/module-init.svg?style=flat-square
[travis-url]: https://travis-ci.org/ngoldman/module-init

Create a new node module with all the right stuff.

⚠ This module uses [ES6 template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings) so it's only for [io.js](https://iojs.org/en/index.html) right now. ⚠

This module is functional, but still under active development. The idea is to automate the following in the working directory:

| step | done |
| :--- | :--: |
| `git init` | ✓ |
| `README.md` w/ title, desc, npm & travis badges, install, usage, contributing, license | ✓ |
| `CHANGELOG.md` using [keepachangelog](http://keepachangelog.com/) style | ✓ |
| `CONTRIBUTING.md` using [`open-2-contributing`](https://github.com/ngoldman/open-2-contributing) template | ✓ |
| `LICENSE.md` using [ISC](http://en.wikipedia.org/wiki/ISC_license) | ✓ |
| `package.json` fully filled out | ✓ |
| [`standard`](https://github.com/feross/standard) & [`faucet`](https://github.com/substack/faucet) added as dev dependencies and set as test script | ✓ |
| [`fixpack`](https://github.com/HenrikJoreteg/fixpack) | ✓ |
| `.travis.yml` w/ [docker support enabled](http://blog.travis-ci.com/2014-12-17-faster-builds-with-container-based-infrastructure/) & [node_modules cached](http://blog.travis-ci.com/2013-12-05-speed-up-your-builds-cache-your-dependencies/) | ✓ |
| `.gitignore` w/ `node_modules` ignored | ✓ |
| blank `index.js` | ✓ |
| blank `test/index.js` | ✓ |
| `npm install` | ✓ |
| travis hook added w/ [`travisjs`](https://github.com/finnp/node-travisjs) (requires auth) | |
| create repo on github & push (overkill?) | |
| `npm publish` (premature?) | |

other todos:

* `module-init <path>` to create new module at a specific path
* allow choice of license, contributing

## Install

```
npm install module-init -g
```

## Usage

```
$ mkdir new-project && cd new-project
$ module-init
```

## Contributing

[Open-2](CONTRIBUTING.md)

## License

[ISC](LICENSE.md)
