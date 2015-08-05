# module-init

> Create a new node module with all the right stuff.

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![experimental][experimental-img]][stability-url]

[npm-image]: https://img.shields.io/npm/v/module-init.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/module-init
[travis-image]: https://img.shields.io/travis/ngoldman/module-init.svg?style=flat-square
[travis-url]: https://travis-ci.org/ngoldman/module-init
[experimental-img]: https://img.shields.io/badge/stability-1%20--%20experimental-orange.svg?style=flat-square
[stability-url]: https://iojs.org/api/documentation.html#documentation_stability_index

Command-line tool to quickly create a new node module with readme, license, contributing guidelines, and other goodies.

* runs `git init`
* creates `README.md` w/ title, desc, npm & travis badges, install, usage, contributing, license
* creates `CHANGELOG.md` using [keepachangelog](http://keepachangelog.com/) style
* creates `CONTRIBUTING.md` using [ngoldman/contributing](https://github.com/ngoldman/contributing) boilerplate
* creates `LICENSE` using [ISC](http://en.wikipedia.org/wiki/ISC_license) or [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0)
* creates `package.json` with all relevant fields filled out and [fixpacked](https://github.com/HenrikJoreteg/fixpack)
* adds [`standard`](https://github.com/feross/standard) or [`semistandard`](https://github.com/Flet/semistandard) & [`tape`](https://github.com/substack/tape) as dev dependencies and sets test script
* creates `.travis.yml` w/ [docker support enabled](http://blog.travis-ci.com/2014-12-17-faster-builds-with-container-based-infrastructure/) & [node_modules cached](http://blog.travis-ci.com/2013-12-05-speed-up-your-builds-cache-your-dependencies/)
* creates `.gitignore` w/ `node_modules` ignored
* creates a blank `index.js`
* creates a blank `test/index.js`
* runs `npm install`

**todo**

* create repo on github (optional, requires auth)
* add travis hook w/ [`travisjs`](https://github.com/finnp/node-travisjs) (optional, requires auth)
* allow `module-init [path] [options]` in cli to create new module at a specific path

## Install

```
npm install module-init -g
```

## Usage

```bash
$ mkdir new-project && cd new-project
$ module-init
? name: new-project
? version: 1.0.0
? description:
? keywords:
? license: ISC
? contributing: Yes
? linter: standard
Initialized empty Git repository in /Users/yourname/new-project/.git/
✓ .gitignore created
✓ .travis.yml created
✓ CHANGELOG.md created
✓ CONTRIBUTING.md created
✓ LICENSE created
✓ README.md created
✓ package.json created
✓ index.js created
✓ test/index.js created
# npm install
✓ new-project initialized
```

## Node API

`module-init` can also be required as a regular node module.

Note that configuration properties from other sources will not be automatically inherited. All required properties need to be passed in explicitly.

```js
var moduleInit = require('module-init')

var data = {
  pkgName: 'cool-package',          // required
  pkgVersion: '1.0.0',              // required
  usrName: 'Your Name',             // required
  usrEmail: 'your@email.com',       // required
  usrGithub: 'githubUsername'       // required
  pkgDescription: 'description',    // optional
  pkgKeywords: 'one, two, three',   // optional
  pkgContributing: true,            // optional, default: true
  pkgLinter: 'standard',            // optional, default: standard
  pkgLicense: 'ISC'                 // optional, default: ISC
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

Take a look at [bin/cli.js](bin/cli.js) to see how the API is being used by the CLI.

## Contributing

Contributions welcome! Please read the [contributing guidelines](CONTRIBUTING.md) before getting started.

## Collaborators

`module-init` is only possible due to the excellent work of the following collaborators:

<table><tbody><tr><th align="left">bcomnes</th><td><a href="https://github.com/bcomnes">GitHub/bcomnes</a></td></tr>
<tr><th align="left">Flet</th><td><a href="https://github.com/Flet">GitHub/Flet</a></td></tr>
<tr><th align="left">ngoldman</th><td><a href="https://github.com/ngoldman">GitHub/ngoldman</a></td></tr>
<tr><th align="left">paulcpederson</th><td><a href="https://github.com/paulcpederson">GitHub/paulcpederson</a></td></tr>
</tbody></table>

## License

[ISC](LICENSE)
