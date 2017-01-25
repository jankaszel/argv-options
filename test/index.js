/* eslint-env mocha */
const assert = require('assert')
const parseOptions = require('../')
const hook_stdout = require('./util/hook_stdout')
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
      oas: 'baz',
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
      rs: 'foo',
      ri: '123',
      oas: 'bar',
      optionalAliasedString: 'bar'
    }

    assert.doesNotThrow(() => 
      args = parseOptions(argv, options))

    assert.deepEqual(args, expectedArgs)
  })

  it('should not throw if all required options are set', () => {
    let args

    const expectedArgs = {
      rs: 'foo',
      ri: '123'
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

  it('should output usage if provided', () => {
    const usage = 'foobar123'
    let output = ''

    const unhook = hook_stdout(string => output =+ string)
    parseOptions([], options, usage)
    unhook()

    assert.equal(output, usage, 'Usage output did not match')
  })
})
