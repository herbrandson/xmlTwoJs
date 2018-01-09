const sax = require('sax')

module.exports = {parse}

function Parser () {
  this.onerror = this.onerror.bind(this)
  this.onopentag = this.onopentag.bind(this)
  this.ontext = this.ontext.bind(this)
  this.onclosetag = this.onclosetag.bind(this)
}

Parser.prototype = {
  parse: function (xml) {
    var result = {}
    this.stack = []
    this.current = result
    this.err = undefined

    var parser = sax.parser(true, {position: false})
    parser.onerror = this.onerror
    parser.onopentag = this.onopentag
    parser.ontext = this.ontext
    parser.onclosetag = this.onclosetag
    parser.write(xml).close()

    if (this.err) {
      throw this.err
    }

    return result
  },

  onerror: function (err) {
    this.err = err
  },

  onopentag: function (item) {
    var name = item.name
    var attributes = item.attributes
    var existing = this.current[name]

    if (!existing) {
      this.current[name] = attributes
    } else if (Array.isArray(existing)) {
      existing.push(attributes)
    } else {
      this.current[name] = [existing, attributes]
    }

    this.stack.push(this.current)
    this.current = attributes
  },

  ontext: function (text) {
    this.current._ = text
  },

  onclosetag: function () {
    this.current = this.stack.pop()
  }
}

var parser = new Parser()

function parse (xml) {
  return parser.parse(xml)
}
