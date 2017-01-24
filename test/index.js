/* eslint-env mocha */
const assert = require('assert')
const parseOptions = require('../')
const options = require('./fixtures/options.json')

const requiredArgv = [
  '-rs',
  'foo',
  '-ri',
  '123'
]

describe('parseOptions()', () => {
  it('should parse optional options', () => {
    let args

    const argv = requiredArgv.concat([
      '-os',
      'bar',
      '-oas',
      'baz'
    ])

    const expectedArgs = {
      rs: 'foo',
      ri: '123',
      os: 'bar',
      oas: 'baz'
    }

    assert.doesNotThrow(() => 
      args = parseOptions(argv, options))

    assert.equal(args, expectedArgs)
  })

  it('should recognize aliases', () => {
    let args

    const argv = requiredArgv.concat([
      '--optionalAliasedString',
      'bar'
    ])

    const expectedArgs = {
      rs: 'foo',
      ri: '123',
      oas: 'bar',
      optionalAliasedString: 'bar'
    }

    assert.doesNotThrow(() => 
      args = parseOptions(argv, options))

    assert.equal(args, expectedArgs)
  })

  it('should not throw if all required options are set', () => {
    let args

    const expectedArgs = {
      rs: 'foo',
      ri: '123'
    }

    assert.doesNotThrow(() =>
      args = parseOptions(requiredArgv, options))

    assert.equal(args, expectedArgs, 'Args did not match')
  })

  it('should throw if a required option is not set', () => {
    const argv = [
      '-rs',
      'foo'
    ]

    assert.throws(() => parseOptions(argv, options), Error)
  })
})
