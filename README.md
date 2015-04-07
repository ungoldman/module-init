# module-init

[![npm][npm-img]][npm-url]
[![travis][travis-img]][travis-url]

[npm-image]: https://img.shields.io/npm/v/module-init.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/module-init
[travis-image]: https://img.shields.io/travis/ngoldman/module-init.svg?style=flat-square
[travis-url]: https://travis-ci.org/ngoldman/module-init

*work in progress*

Create a node module the way Nate likes it.

Using ES6 template strings so it's only for iojs right now. Also it's not even close to functional.

Things Nate likes:

* `README.md` with npm & travis badge ready to go
* `CHANGELOG.md` using `changelog-init`
* `CONTRIBUTING.md` using "OPEN Open Source Project" template
* `LICENSE.md` of the ISC variety
* `package.json` fully filled out and fixpacked
  * `standard && faucet` installed as dev dependencies and set as test script
* `.travis.yml` set up
  * docker support
  * node module caching
  * testing 0.10, 0.12, iojs ? maybe i don't know. maybe none of them. so many now. it's like IE.
  * hook added w/ `travisjs hook`
* `.gitignore` w/ `node_modules` ignored
* blank `index.js`
* blank `test/index.js`

Should work like so:

```
~/dir/ $ module-init
everything's great I took care of it all, time to relax
```

Related idea:

* A module to automate turning my ideas into functional modules
