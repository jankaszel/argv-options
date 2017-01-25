module.exports = function parseOptions(argv, options, usage = undefined) {
  let args = {}
  
  for (let i = 0; i < argv.length; i++) {
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

          break
        }
      }
    }
  }

  return args
}
