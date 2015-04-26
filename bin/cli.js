#!/usr/bin/env node

var moduleInit = require('..')
var path = require('path')
var chalk = require('chalk')
var config = require('git-config').sync()
var inquirer = require('inquirer')
var errs = 0

if (!config.user ||
  !config.user.name) {
  console.log(chalk.red('Missing user name in .gitconfig'))
  console.log('  Please make sure your name is set, e.g.')
  console.log('  git config --global user.name "YOUR NAME"')
  errs++
}

if (!config.user ||
  !config.user.email) {
  console.log(chalk.red('Missing user email in .gitconfig'))
  console.log('  Please make sure your email is set, e.g.')
  console.log('  git config --global user.email "YOUR EMAIL"')
  errs++
}

if (!config.github || !config.github.user) {
  console.log(chalk.red('Missing github user in .gitconfig'))
  console.log('  Please make sure your github username is set, e.g.')
  console.log('  git config --global github.user "YOUR USERNAME"')
  errs++
}

if (errs) process.exit(1)

var questions = [{
  type: 'input',
  name: 'pkgName',
  message: 'name',
  default: path.basename(process.cwd())
},
{
  type: 'input',
  name: 'pkgVersion',
  message: 'version',
  default: '1.0.0'
},
{
  type: 'input',
  name: 'pkgDescription',
  message: 'description'
},
{
  type: 'input',
  name: 'pkgKeywords',
  message: 'keywords'
},
{
  type: 'list',
  name: 'pkgLicense',
  message: 'license',
  choices: ['ISC', 'Apache-2.0'],
  default: 'ISC'
},
{
  type: 'input',
  name: 'pkgContributing',
  message: 'contributing',
  default: 'Open-2'
},
{
  type: 'list',
  name: 'pkgLinter',
  message: 'linter',
  choices: ['standard', 'semistandard'],
  default: 'standard'
},
{
  type: 'list',
  name: 'pkgSummarizer',
  message: 'TAP summarizer',
  choices: ['faucet', 'tap-spec'],
  default: 'faucet'
}]

inquirer.prompt(questions, function (data) {
  data.usrName = config.user.name
  data.usrEmail = config.user.email
  data.usrGithub = config.github.user

  if (!data.pkgDescription) data.pkgDescription = ''
  if (data.pkgKeywords !== '') {
    data.pkgKeywords = data.pkgKeywords
      .split(/[\s,]+/)
      .filter(function (value, index, self) {
        return !!value && self.indexOf(value) === index
      })
      .map(function (value) {
        return '"' + value + '"'
      })
      .join(', ')
  }

  moduleInit(data)
    .on('create', function (file) {
      // file created
      console.warn(chalk.green('✓ ') + chalk.bold(file) + ' created')
    })
    .on('warn', function (msg) {
      // something weird happened
      console.warn(chalk.yellow('✗ ' + msg))
    })
    .on('err', function (err) {
      // something went horribly wrong!
      console.error(err)
      process.exit(1)
    })
    .on('done', function (res) {
      // we did it!
      console.log(chalk.green('✓ ') + chalk.bold(res.pkgName) + ' initialized')
      process.exit(0)
    })
    .run() // run the thing
})
