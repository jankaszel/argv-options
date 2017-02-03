/* eslint-env mocha */
const assert = require('assert')
const parseOptions = require('../')
const options = require('./fixtures/options.json')

const requiredArgv = [
  '-a',
  'foo',
  '-b',
  'bar',
  '-c',
  '123'
]

describe('parseOptions()', () => {
  it('should parse optional options', () => {
    let args

    const argv = requiredArgv.concat([
      '-d',
      'bar',
      '-e',
      'baz'
    ])

    const expectedArgs = {
      a: 'foo',
      b: 'bar',
      requiredAliasedString: 'bar',
      c: '123',
      d: 'bar',
      e: 'baz',
      optionalAliasedString: 'baz'
    }

    assert.doesNotThrow(() => 
      args = parseOptions(argv, options))

    assert.deepEqual(args, expectedArgs)
  })

  it('should recognize aliases', () => {
    let args

    const argv = requiredArgv.concat([
      '--optionalAliasedString',
      'bar'
    ])

    const expectedArgs = {
      a: 'foo',
      b: 'bar',
      requiredAliasedString: 'bar',
      c: '123',
      e: 'bar',
      optionalAliasedString: 'bar'
    }

    assert.doesNotThrow(() => 
      args = parseOptions(argv, options))

    assert.deepEqual(args, expectedArgs)
  })

  it('should not throw if all required options are set', () => {
    let args

    const expectedArgs = {
      a: 'foo',
      b: 'bar',
      requiredAliasedString: 'bar',
      c: '123'
    }

    assert.doesNotThrow(() =>
      args = parseOptions(requiredArgv, options))

    assert.deepEqual(args, expectedArgs, 'Args did not match')
  })

  it('should throw if a required option is not set', () => {
    const argv = [
      '-rs',
      'foo'
    ]

    assert.throws(() => parseOptions(argv, options), Error)
  })

  it('should throw if an unknown option is set', () => {
    const argv = requiredArgv.concat([
      '--foobar'
    ])

    assert.throws(() => parseOptions(argv, options), Error)
  })
})
