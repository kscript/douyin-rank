const fs = require('fs-extra')
const path = require('path')
const jsonpack = require('@kscript/json-pack')
const requireContext = require('require-context')
const inputPath = path.resolve(__dirname, './raw')
const keyPath = path.resolve(__dirname, './raw/key.txt')

const pack = () => {
  const files = requireContext(inputPath, true, /\.json$/)
  const options = {
    keys: []
  }
  files.keys()
    .map(key => {
      const data = files(key)
      const [content] = jsonpack.compress(data, options)
      console.log(key)
      fs.writeFileSync(path.resolve(inputPath, `${key}.pack`), content)
    })
  fs.writeFileSync(keyPath, options.keys.join(','))
}
const unpack = () => {
  const files = requireContext(inputPath, true, /\.json.pack$/)
  const options = {
    keys: []
  }
  const keys = fs.readFileSync(keyPath)
  options.keys = keys.toString('utf8').split(',')
  files.keys()
    .map(key => {
      const filePath = files.resolve(key)
      const data = fs.readFileSync(filePath).toString('utf8')
      const content = jsonpack.decompress(data, options)
      const outputPath = path.resolve(path.dirname(filePath), 'out')
      const fileName = path.basename(key).replace(/.pack$/, '')
      fs.mkdirSync(outputPath, { recursive: true })
      fs.writeFileSync(path.resolve(outputPath, fileName), JSON.stringify(content, null, 2))
      console.log(key, filePath)
    })
}

Object.assign(module.exports, 
  Object.assign(exports, {
    pack,
    unpack
  })
)
