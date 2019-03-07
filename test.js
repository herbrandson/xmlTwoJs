var describe = require('mocha').describe
var it = require('mocha').it
var assert = require('assert')
var parser = require('./index')

describe('xmlTwoJs', function () {
  it('can parse text', function () {
    var xml = '<node>test</node>'
    var result = parser.parse(xml)
    assert.equal('test', result.node._)
  })

  it('can parse multiple lines of text', function () {
    var xml = '<node>test1\ntest2\ntest3\n</node>'
    var result = parser.parse(xml)
    assert.equal('test1\ntest2\ntest3\n', result.node._)
  })

  it('can parse attributes', function () {
    var xml = '<node text="test" />'
    var result = parser.parse(xml)
    assert.equal('test', result.node.text)
  })

  it('can parse child node', function () {
    var xml = '<node><child>test</child></node>'
    var result = parser.parse(xml)
    assert.equal('test', result.node.child._)
  })

  it('can parse child node array', function () {
    var xml = '<node><child>test1</child><child>test2</child></node>'
    var result = parser.parse(xml)
    assert.equal('test1', result.node.child[0]._)
    assert.equal('test2', result.node.child[1]._)
  })

  it('will throw errors', function () {
    try {
      var xml = '</node>'
      parser.parse(xml)
      assert.fail('Should have thrown')
    } catch (err) {
      assert.equal('Unhandled error. (not well-formed (invalid token))', err.message)
    }
  })
})
