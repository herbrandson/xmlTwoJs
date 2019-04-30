var describe = require('mocha').describe
var it = require('mocha').it
var assert = require('assert')
var parser = require('./index')

describe('xmlTwoJs', function () {
  it('can parse text', async function () {
    var xml = '<node>test</node>'
    var result = await parser.parse(xml)
    assert.strictEqual('test', result.node._)
  })

  it('can parse multiple lines of text', async function () {
    var xml = '<node>test1\ntest2\ntest3\n</node>'
    var result = await parser.parse(xml)
    assert.strictEqual('test1\ntest2\ntest3\n', result.node._)
  })

  it('can parse attributes', async function () {
    var xml = '<node text="test" />'
    var result = await parser.parse(xml)
    assert.strictEqual('test', result.node.text)
  })

  it('can parse child node', async function () {
    var xml = '<node><child>test</child></node>'
    var result = await parser.parse(xml)
    assert.strictEqual('test', result.node.child._)
  })

  it('can parse child node array', async function () {
    var xml = '<node><child>test1</child><child>test2</child></node>'
    var result = await parser.parse(xml)
    assert.strictEqual('test1', result.node.child[0]._)
    assert.strictEqual('test2', result.node.child[1]._)
  })

  it('will throw errors', async function () {
    try {
      var xml = '</node>'
      await parser.parse(xml)
      assert.fail('Should have thrown')
    } catch (err) {
      assert.strictEqual(`XML Parse Error`, err.message)
    }
  })
})
