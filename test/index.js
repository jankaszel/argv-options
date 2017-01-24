/* eslint-env mocha */
const assert = require('assert')
const parseOptions = require('../')
const options = require('./fixtures/options.json')

describe('parseOptions()', () => {
  it('should recognize aliases', () => {
    assert(false, 'Not implemented yet')
  })

  it('should not throw if all required options are set', () => {
    let args

    const argv = [
      '-rs',
      'foo',
      '-ri',
      '123'
    ]

    const expectedArgs = {
      rs: 'foo',
      ri: '123'
    }

    assert.doesNotThrow(() =>
      args = parseOptions(argv, options))

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
