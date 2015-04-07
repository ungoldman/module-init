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
  message: 'description',
  default: 'wip'
},
{
  type: 'input',
  name: 'pkgKeywords',
  message: 'keywords'
},
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
  var exec = require('shelljs').exec

  data.usrName = config.user.name
  data.usrEmail = config.user.email
  data.usrGithub = config.github.user
  data.usrNpm = exec('npm whoami', { silent: true }).output.replace('\n', '')

  if (!data.pkgDescription) data.pkgDescription = ''
  if (data.pkgKeywords) {
    data.pkgKeywords = data.pkgKeywords
      .split(/[\s,]+/)
      .filter(function (value, index, self) {
        return !!value && self.indexOf(value) === index
      })
  } else {
    data.pkgKeywords = []
  }

  init(data, function (err, res) {
    if (err) throw err

    console.log(`local files for ${res} created`)

    inquirer.prompt({
      type: 'confirm',
      name: 'confirm',
      message: `git init & create repo ${data.usrGithub}/${data.pkgName}?`,
      default: true,
      validate: function (input) {
        if (!input) return false
        return true
      }
    }, function (answer) {
      if (!answer.confirm) return process.exit(0)

      createRepo(`${data.usrGithub}/${data.pkgName}`)
    })
  })
})

function createRepo (repo) {
  console.log(`https://github.com/${repo}`)
}
