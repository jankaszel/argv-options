module.exports = function parseOptions(argv, options) {
  let args = {}, unknownOptions = []

  for (let i = 0; i < argv.length; i++) {
    let foundOption = false
    const keys = Object.keys(options)

    for (let j = 0; j < keys.length; j++) {
      const key = keys[j]
      const alias = options[key].alias

      if (argv[i] === `-${key}` || alias && argv[i] === `--${alias}`) {
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
