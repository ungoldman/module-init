# module-init

*work in progress*

Create a node module the way Nate likes it.

Things Nate likes:

* `README.md` with npm & travis badge ready to go
* `CHANGELOG.md` using `changelog-init`
* `CONTRIBUTING.md` using "OPEN Open Source Project" template
* `LICENSE.md` of the ISC variety
* `package.json` fully filled out and fixpacked
  * standard, tape, tap-spec installed as dev dependencies
  * `standard && node test | tap-spec` as test script
* `.travis.yml` set up
  * docker support
  * node module caching
  * testing 0.10, 0.12, iojs ? maybe i don't know. maybe none of them. so many now. it's like IE.
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
