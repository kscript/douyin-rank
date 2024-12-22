const path = require('path')
const fse = require('fs-extra')
const { dayjs } = require('./day')
const jsonpack = require('@kscript/json-pack')

const saveData = async (options, data) => {
  options = options instanceof Object ? options : {}
  const { dir, fileName = '${type} ${hour}.json.pack', now = new Date() } = options
  const date = dayjs.tz(now).format('YYYY-MM-DD')
  const hour = ('00' + dayjs.tz(now).format('HH')).slice(-2)
  const output = path.resolve(__dirname, dir || 'raw', date)
  await fse.ensureDir(output)
  if (data instanceof Object) {
    const content = jsonpack.compress(data)
    await fse.writeFile(path.resolve(output, fileName.replace(/\$\{(.*?)\}/g, (s, s1) => options[s1] || { date, hour }[s1] || s)), content)
  }
}

Object.assign(exports, {
  saveData
})
