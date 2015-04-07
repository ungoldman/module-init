#!/usr/bin/env node

var init = require('..')
var path = require('path')
var inquirer = require('inquirer')

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
// {
//   type: 'input',
//   name: 'pkgKeywords',
//   message: 'keywords'
// },
{
  type: 'input',
  name: 'pkgLicense',
  message: 'license',
  default: 'ISC'
},
{
  type: 'input',
  name: 'pkgContributing',
  message: 'contributing',
  default: 'Open-2'
}]

inquirer.prompt(questions, function (data) {
  var config = require('git-config').sync()

  if (!config.user ||
    !config.user.name ||
    !config.user.email) {
    console.log(chalk.red('Error: missing git user info'))
    console.log('  please make sure your name and email are in your git config')
    console.log('  example: git config --global user.name "YOUR NAME"')
    console.log('           git config --global user.email "YOUR EMAIL"')
    process.exit(1)
  }

  data.usrName = config.user.name
  data.usrEmail = config.user.email

  if (!config.github || !config.github.user) {
    console.log(chalk.red('Error: missing github user'))
    console.log('  please add github user to your git config')
    console.log('  example: git config --global github.user "YOUR USERNAME"')
    process.exit(1)
  }

  data.usrGithub = config.github.user

  if (!data.pkgDescription) data.pkgDescription = ''
  // if (data.pkgKeywords) {
  //   data.pkgKeywords = data.pkgKeywords
  //     .split(/[\s,]+/)
  //     .filter(function (value, index, self) {
  //       return !!value && self.indexOf(value) === index
  //     })
  // } else {
  data.pkgKeywords = []
  // }

  init(data, function (err, res) {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    process.exit(0)
  })
})
