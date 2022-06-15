'use strict'

const { expect } = require('chai')
const { check, files, bump } = require('../utils')

describe('bump premajor', () => {
  it('should increment an all-zero version number', () => {
    files.create('package.json', { version: '0.0.0' })

    const cli = bump('premajor')

    expect(cli).to.have.stderr('')
    expect(cli).to.have.exitCode(0)

    expect(cli).to.have.stdout(
      `${check} Updated package.json to 1.0.0-beta.1\n`,
    )

    expect(files.json('package.json')).to.deep.equal({ version: '1.0.0-beta.1' })
  })

  it('should reset the minor and patch', () => {
    files.create('package.json', { version: '1.2.3' })

    const cli = bump('premajor')

    expect(cli).to.have.stderr('')
    expect(cli).to.have.exitCode(0)

    expect(cli).to.have.stdout(
      `${check} Updated package.json to 2.0.0-beta.1\n`,
    )

    expect(files.json('package.json')).to.deep.equal({ version: '2.0.0-beta.1' })
  })

  it('should reset the prerelease version', () => {
    files.create('package.json', { version: '1.2.3-beta.4' })

    const cli = bump('premajor')

    expect(cli).to.have.stderr('')
    expect(cli).to.have.exitCode(0)

    expect(cli).to.have.stdout(
      `${check} Updated package.json to 2.0.0-beta.1\n`,
    )

    expect(files.json('package.json')).to.deep.equal({ version: '2.0.0-beta.1' })
  })

  it('should honor the --preid flag', () => {
    files.create('package.json', { version: '1.2.3-beta.4' })

    const cli = bump('premajor --preid alpha')

    expect(cli).to.have.stderr('')
    expect(cli).to.have.exitCode(0)

    expect(cli).to.have.stdout(
      `${check} Updated package.json to 2.0.0-alpha.1\n`,
    )

    expect(files.json('package.json')).to.deep.equal({ version: '2.0.0-alpha.1' })
  })

  it('should error if there is no existing version number', () => {
    files.create('package.json', { name: 'my-app' })
    files.create('bower.json', { version: '' })
    files.create('component.json', { version: 0 })

    const cli = bump('premajor *.json')

    expect(cli).to.have.stdout('')
    expect(cli).to.have.stderr('Unable to determine the current version number. Checked bower.json, component.json, package.json.\n')
    expect(cli).to.have.exitCode(1)

    expect(files.json('package.json')).to.deep.equal({ name: 'my-app' })
    expect(files.json('bower.json')).to.deep.equal({ version: '' })
    expect(files.json('component.json')).to.deep.equal({ version: 0 })
  })
})
