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

  data.usrName = config.user.name
  data.usrEmail = config.user.email
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
    if (err) throw err

    console.log(`local files for ${res} created`)
  })
})
