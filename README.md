# module-init

> Create a new node module with all the right stuff.

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]
[![downloads][downloads-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/module-init.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/module-init
[travis-image]: https://img.shields.io/travis/ungoldman/module-init.svg?style=flat-square
[travis-url]: https://travis-ci.org/ungoldman/module-init
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://standardjs.com/
[downloads-image]: https://img.shields.io/npm/dm/module-init.svg?style=flat-square

Command-line tool to quickly create a new node module with readme, license, contributing guidelines, and other goodies.

* creates `README.md`
  * includes title, description, and some tasteful badges (version, build status, code style)
  * auto-populates install, usage, contributing, and license sections with relevant info
* creates `CHANGELOG.md` using [keepachangelog](http://keepachangelog.com/) style
* creates `LICENSE.md` (`Apache-2.0`, `BSD-3-Clause`, `CC0-1.0`, `ISC`, `MIT`, or `UNLICENSED`)
* creates `package.json` with all standard fields filled out
  * adds code style linter ([`standard`](https://github.com/feross/standard) or [`semistandard`](https://github.com/Flet/semistandard)) to `devDependencies`
  * adds [`tape`](https://github.com/substack/tape) & [`tap-spec`](https://github.com/scottcorgan/tap-spec) to `devDependencies`
  * sets up `npm test` script
  * runs [`fixpack`](https://github.com/HenrikJoreteg/fixpack)
* creates `.travis.yml` w/ [docker support enabled](http://blog.travis-ci.com/2014-12-17-faster-builds-with-container-based-infrastructure/) & [node_modules cached](http://blog.travis-ci.com/2013-12-05-speed-up-your-builds-cache-your-dependencies/)
* creates `.gitignore` w/ `node_modules` ignored
* creates a blank `index.js` file
* creates a boilerplate `test/index.js` file
* optionally creates `CONTRIBUTING.md` using [ungoldman/CONTRIBUTING.md](https://github.com/ungoldman/CONTRIBUTING.md) boilerplate
* optionally runs `git init`
* optionally runs `npm install`

## Install

```
npm install module-init -g
```

## Usage

```
$ module-init --help
Usage: module-init [options]
    --dir, -d             specify module directory (default: cwd)
    --version, -v         show version information
    --force, -f           skip prompt and init with defaults
    --help, -h            show help
$ module-init -d new-project
? name: new-project
? version: 1.0.0
? description:
? keywords:
? license: ISC
? private: No
? CONTRIBUTING.md: Yes
? linter: standard
? git init: Yes
? npm install: Yes
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
tape@4.0.3 node_modules/tape
...
tap-spec@4.0.2 node_modules/tap-spec
...
standard@5.0.2 node_modules/standard
...
✓ new-project initialized
```

## Node API

`module-init` can also be required as a regular node module.

Configuration properties from other sources (`.gitconfig`, current working directory) will not be automatically used as defaults in this mode. All required properties need to be passed in explicitly.

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
  pkgLicense: 'ISC',                // optional, default: ISC
  private: true,                    // optional, default: false (omitted if false)
  dir: 'project-directory'          // optional: default: cwd
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
<tr><th align="left">paulcpederson</th><td><a href="https://github.com/paulcpederson">GitHub/paulcpederson</a></td></tr>
<tr><th align="left">ungoldman</th><td><a href="https://github.com/ungoldman">GitHub/ungoldman</a></td></tr>
</tbody></table>

## License

[ISC](LICENSE.md)
