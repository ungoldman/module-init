module.exports = readme
readme.filename = 'README.md'

function readme (data) {
  return `# ${data.pkgName}

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]

[npm-image]: https://img.shields.io/npm/v/${data.pkgName}.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/${data.pkgName}
[travis-image]: https://img.shields.io/travis/${data.usrGithub}/${data.pkgName}.svg?style=flat-square
[travis-url]: https://travis-ci.org/${data.usrGithub}/${data.pkgName}

${data.pkgDescription}

## Install

\`\`\`
npm install ${data.pkgName}
\`\`\`

## Usage

\`\`\`js
var ${data.nodeName} = require('${data.pkgName}')
\`\`\`

## Contributing

[${data.pkgContributing}](CONTRIBUTING.md)

## License

[${data.pkgLicense}](LICENSE.md)
`
}
