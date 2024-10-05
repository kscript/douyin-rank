const path = require('path')
const fse = require('fs-extra')
const { dayjs } = require('./day')
const saveData = async (type, data) => {
  const now = new Date()
  const date = dayjs.tz(now).format('YYYY-MM-DD')
  const hour = dayjs.tz(now).format('HH')
  const output = path.resolve(__dirname, 'raw', date)
  await fse.ensureDir(output)
  await fse.writeFile(path.resolve(output, `${type} ${hour}.json`), JSON.stringify(data, null, 2))
}

Object.assign(exports, {
  saveData
})
