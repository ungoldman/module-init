# module-init

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]

[npm-image]: https://img.shields.io/npm/v/module-init.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/module-init
[travis-image]: https://img.shields.io/travis/ngoldman/module-init.svg?style=flat-square
[travis-url]: https://travis-ci.org/ngoldman/module-init

*work in progress*

Create a new node module with all the right stuff.

Note: This module uses [ES6 template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings) so it's only for [io.js](https://iojs.org/en/index.html) right now.

The idea is to create the following in the working directory:

* run `git init`
* create `README.md` with npm & travis badges ready to go
* create `CHANGELOG.md` using `keep-a-changelog` style
* create `CONTRIBUTING.md` using [`open-2-contributing`](https://github.com/ngoldman/open-2-contributing) *incomplete*
* create `LICENSE.md` using [ISC](http://en.wikipedia.org/wiki/ISC_license)
* create `package.json` fully filled out and [fixpacked](https://github.com/HenrikJoreteg/fixpack) *incomplete*
  * install `standard && faucet` as dev dependencies and set as test script
* create `.travis.yml`
  * [docker support enabled](http://blog.travis-ci.com/2014-12-17-faster-builds-with-container-based-infrastructure/)
  * [`node_modules` cached](http://blog.travis-ci.com/2013-12-05-speed-up-your-builds-cache-your-dependencies/)
  * set to test `0.12`, `iojs`
  * hook added w/ `travisjs hook` *incomplete*
* create `.gitignore` w/ `node_modules` ignored
* create blank `index.js`
* create blank `test/index.js`
* create repo on github *incomplete*

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
