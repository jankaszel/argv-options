function matchesKey(arg, key, alias) {
  return arg === `-${key}` ||
    alias && arg === `--${alias}` ||
    arg.indexOf(`-${key}=`) === 0 ||
    alias && arg.indexOf(`--${alias}=`) === 0
}

function getAlias(options, key) {
  switch (typeof options[key]) {
    case 'string':
      return options[key]

    case 'object':
      return options[key].alias

    default:
      return null
  }
}

module.exports = function parseOptions(argv, options) {
  let args = {}, unknownOptions = []

  for (let i = 0; i < argv.length; i++) {
    let foundOption = false
    const keys = Object.keys(options)

    for (let j = 0; j < keys.length; j++) {
      const key = keys[j]
      const alias = getAlias(options, key)

      if (matchesKey(argv[i], key, alias)) {
        const k = ++i
        const val = argv[k]

        if (argv.length <= k) {
          break
        } else {
          args[key] = val

          if (alias) {
            args[alias] = val
          }

          foundOption = true
          break
        }
      }
    }

    if (!foundOption) {
      unknownOptions.push(argv[i])
    }
  }

  const hasRequiredOptions = Object.keys(options).every(key => {
    const option = options[key]

    if (!option.optional) {
      return Object.keys(args).indexOf(key) > -1
    } else {
      return true
    }
  })

  if (unknownOptions.length > 0 || !hasRequiredOptions) {
    throw new Error('Arguments to no correspond to `options`')
  }

  return args
}
