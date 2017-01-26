# argv-options

[![npm](https://img.shields.io/npm/v/argv-options.svg)](https://www.npmjs.com/package/argv-options)
[![Travis](https://travis-ci.org/fallafeljan/argv-options.svg)]()

`argv-options` subjectively parses your `argv` options, i.e., it makes
assumptions about how your CLI is designed to keep the API simple. It expects your `argv` object to be supplied in the format of `-p foo --param bar`, i.e., 
simple key-value arguments that may be aliased (using `--`).

## API 

`parseOptions(argv, options)`

This method will return the parsed options in a key-value based object,
including all found options and their respective aliases. The following
arugments are mandatory:

* `argv` The arguments array, as space-split array of all parameters. In your
  average usage case, passing `process.argv.slice(2)` will do.
* `options` The possible options, as object:

```json
{
  "p": {
    "optional": false,
    "alias": "param"
  },

  "a": {
    "optional": true,
    "alias": "argument"
  }
}
```

If any non-optional parameters are missing or undocumented parameters occur,
`parseOptions` will throw an error.
