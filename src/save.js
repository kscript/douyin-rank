const path = require('path')
const fse = require('fs-extra')
const { dayjs } = require('./day')
const saveData = async (options, data) => {
  const { type, dir } = options instanceof Object ? options : {}
  const now = new Date()
  const date = dayjs.tz(now).format('YYYY-MM-DD')
  const hour = dayjs.tz(now).format('HH')
  const output = path.resolve(__dirname, dir || 'raw', date)
  await fse.ensureDir(output)
  if (data instanceof Object) {
    await fse.writeFile(path.resolve(output, `${type} ${hour}.json`), JSON.stringify(data, null, 2))
  }
}

Object.assign(exports, {
  saveData
})
