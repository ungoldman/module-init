# module-init

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![stability][stability-image]][stability-url]


[npm-image]: https://img.shields.io/npm/v/module-init.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/module-init
[travis-image]: https://img.shields.io/travis/ngoldman/module-init.svg?style=flat-square
[travis-url]: https://travis-ci.org/ngoldman/module-init
[stability-image]: https://img.shields.io/badge/stability-1%20--%20experimental-yellow.svg?style=flat-square
[stability-url]: https://nodejs.org/api/documentation.html#documentation_stability_index

Create a new node module with all the right stuff.

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
| create repo on github (optional, requires auth) | |
| travis hook added w/ [`travisjs`](https://github.com/finnp/node-travisjs) (optional, requires auth) | |

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

## Node API

`module-init` can also be required as a regular node module.

Note that configuration properties from other sources will not be automatically inherited. All required properties need to be passed in explicitly.

```js
var moduleInit = require('module-init')

var data = {
  pkgName: 'cool-package',          // required
  pkgVersion: '1.0.0',              // required
  pkgLicense: 'ISC',                // required
  usrName: 'Your Name',             // required
  usrEmail: 'your@email.com',       // required
  usrGithub: 'githubUsername'       // required
  pkgDescription: 'description',
  pkgKeywords: 'one, two, three',
  pkgContributing: 'Open-2'
}

moduleInit(data)
  .on('create', function (file) {
    // file created
  })
  .on('warn', function (message) {
    // something weird but non-critical happened
  })
  .on('err', function (err) {
    // something went horribly wrong! stop everything!
  })
  .on('done', function (data) {
    // done!
  })
  .run() // run the thing
```

`moduleInit` returns an event emitter that emits `create`, `warn`, `err`, and `done`.

`moduleInit.on(string, function)` works as demonstrated in the example above.

`moduleInit.run()` runs the initialization process. It also calls `moduleInit.validate()` internally before proceeding and will emit an `err` event if required options are missing. Event listeners need to be set before `moduleInit.run()` is called.

`moduleInit.validate()` returns an array of missing required options. It returns an empty array if everything's fine. This method is really just for internal use, but is exposed for testing and convenience.

Check [bin/cli.js#L88-L107](bin/cli.js#L88-L107) to see how the API is being used by the CLI.

## Contributing

[Open-2](CONTRIBUTING.md)

## License

[ISC](LICENSE.md)
