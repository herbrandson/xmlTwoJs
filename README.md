
# xmlTwoJs

A super simple parser for converting xml to json. Roughly 2x as fast as [xml2js](https://www.npmjs.com/package/xml2js).

# Installation

Simplest way to install `xml2js` is to use [npm](http://npmjs.org), just `npm install xmltwojs`.

# Example
```javascript
const xmltwojs = require('xmltwojs');
const json = xmltwojs.parse('<root attr="7">Hello xmltwojs!</root>');
console.log(json);
```

Which outputs the following:

```javascript
{
    "root": {
        "attr": "7",
        "_": "Hello xmltwojs!"
    }
}
```

A few important notes.

 1. The inner text of a node will always be names "_" in the resulting json object
 2. No type conversion is attempted. For example, in the case above the value of "attr" is a string, not a number
 3. xmlTwoJs will automatically create an array when it finds multiple sibling nodes with the same name. However, because of the nature of xml it is not possible to detect arrays with only one value.

Consider the following example:

```javascript
const xml = `<root>
    <array1>
        <item>1</item>
        <item>2</item>
    </array1>
    <array2>
        <item>3</item>
    </array2>
</root>`;

const json = xmltwojs.parse(xml);
console.log(json);

```

which yields
```javascript
{
    "root": {
        "array1": {
            "item": [
                {
                    "_": "1"
                },
                {
                    "_": "2"
                }
            ]
        },
        "array2": {
            "item": {
                "_": "3"
            }
        }
    }
}
```

Note that `array1.item` is an array. But, since "array2" only has one "item" node,  `array2.item` is an object.

# Testing
```
npm i
npm test
```
