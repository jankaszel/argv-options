module.exports = function parseOptions(argv, options, usage = undefined) {
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

  if (unknownOptions.length > 0) {
    if (typeof usage !== 'undefined') {
      // eslint-disable-next-line no-console
      console.log(usage)
    } else {
      throw new Error('Arguments to no correspond to `options`')
    }
  }

  return args
}
