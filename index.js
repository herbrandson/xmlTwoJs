var expat = require('node-expat')

module.exports = {parse}

function Parser () {
  this.onStartElement = this.onStartElement.bind(this)
  this.onText = this.onText.bind(this)
  this.onEndElement = this.onEndElement.bind(this)
}

Parser.prototype = {
  parse: function (xml) {
    var result = {}
    this.stack = []
    this.current = result

    var parser = new expat.Parser('UTF-8')
    parser.on('startElement', this.onStartElement)
    parser.on('text', this.onText)
    parser.on('endElement', this.onEndElement)
    var success = parser.write(xml)

    if (!success) {
      var error = parser.getError()
      throw new Error(error)
    }

    return result
  },

  onStartElement: function (name, attributes) {
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

  onText: function (text) {
    if (this.current._) {
      this.current._ += text
    } else {
      this.current._ = text
    }    
  },

  onEndElement: function () {
    this.current = this.stack.pop()
  }
}

var parser = new Parser()

function parse (xml) {
  return parser.parse(xml)
}
