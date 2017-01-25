// <https://gist.github.com/pguillory/729616>
module.exports = function hook_stdout(callback) {
  const old_write = process.stdout.write

  process.stdout.write = (write => {
    return (string, encoding, fd) => {
      write.apply(process.stdout, arguments)
      callback(string, encoding, fd)
    }
  })(process.stdout.write)

  return () => {
    process.stdout.write = old_write
  }
}
