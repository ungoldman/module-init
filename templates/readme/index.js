module.exports = readme
readme.node = node

function readme (data) {
  return node(data)
}

function node (data) {
  return `# ${data.pkg.name}

[![npm][npm-img]][npm-url]
[![travis][travis-img]][travis-url]

[npm-image]: https://img.shields.io/npm/v/${data.pkg.name}.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/${data.pkg.name}
[travis-image]: https://img.shields.io/travis/${data.user.github}/${data.pkg.name}.svg?style=flat-square
[travis-url]: https://travis-ci.org/${data.user.github}/${data.pkg.name}

${data.pkg.description}

## Install

\`\`\`
npm install ${data.pkg.name}
\`\`\`

## Usage

\`\`\`js
var ${data.node.name} = require('${data.pkg.name}')
\`\`\`

## Contributing

[${data.pkg.contributing}](CONTRIBUTING.md)

## License

[${data.pkg.license}](LICENSE.md)
`
}
