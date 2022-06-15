'use strict'

const { expect } = require('chai')
const { check, files, bump } = require('../utils')

describe('bump minor', () => {
  it('should increment an all-zero version number', () => {
    files.create('package.json', { version: '0.0.0' })

    const cli = bump('minor')

    expect(cli).to.have.stderr('')
    expect(cli).to.have.exitCode(0)

    expect(cli).to.have.stdout(
      `${check} Updated package.json to 0.1.0\n`,
    )

    expect(files.json('package.json')).to.deep.equal({ version: '0.1.0' })
  })

  it('should reset the patch', () => {
    files.create('package.json', { version: '1.2.3' })

    const cli = bump('minor')

    expect(cli).to.have.stderr('')
    expect(cli).to.have.exitCode(0)

    expect(cli).to.have.stdout(
      `${check} Updated package.json to 1.3.0\n`,
    )

    expect(files.json('package.json')).to.deep.equal({ version: '1.3.0' })
  })

  it('should reset the prerelease version', () => {
    files.create('package.json', { version: '1.2.3-beta.4' })

    const cli = bump('minor')

    expect(cli).to.have.stderr('')
    expect(cli).to.have.exitCode(0)

    expect(cli).to.have.stdout(
      `${check} Updated package.json to 1.3.0\n`,
    )

    expect(files.json('package.json')).to.deep.equal({ version: '1.3.0' })
  })

  it('should not be affected by the --preid flag', () => {
    files.create('package.json', { version: '1.2.3-beta.4' })

    const cli = bump('minor --preid alpha')

    expect(cli).to.have.stderr('')
    expect(cli).to.have.exitCode(0)

    expect(cli).to.have.stdout(
      `${check} Updated package.json to 1.3.0\n`,
    )

    expect(files.json('package.json')).to.deep.equal({ version: '1.3.0' })
  })

  it('should error if there is no existing version number', () => {
    files.create('package.json', { name: 'my-app' })
    files.create('bower.json', { version: '' })
    files.create('component.json', { version: 0 })

    const cli = bump('minor *.json')

    expect(cli).to.have.stdout('')
    expect(cli).to.have.stderr('Unable to determine the current version number. Checked bower.json, component.json, package.json.\n')
    expect(cli).to.have.exitCode(1)

    expect(files.json('package.json')).to.deep.equal({ name: 'my-app' })
    expect(files.json('bower.json')).to.deep.equal({ version: '' })
    expect(files.json('component.json')).to.deep.equal({ version: 0 })
  })
})
