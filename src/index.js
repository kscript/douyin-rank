const { list } = require('./config')
const { getData } = require('./fetch')
const { saveData } = require('./save')
const { dayjs } = require('./day')

const save = async (options) => {
  const { url } = options
  const data = await getData(url)
  if (data instanceof Object) {
    await saveData(options, data)
  }
  return data
}
const main = async () => {
  const now = new Date()
  return list.filter(item => {
    const { url, page, hour } = item
    const realUrl = typeof url === 'function' ? url(page) : url
    Object.assign(item, { url: realUrl, now })
    return Array.isArray(hour) ? hour.includes(+dayjs.tz(now).format('HH')) : true
  }).map(async (item) => {
    const { type, page } = item
    if (page instanceof Object) {
      const { total, limit, start, verify } = page
      const timeout = page.timeout > 1e3 ? page.timeout : 1e3
      if (total === undefined) {
        const queue = async (offset = 0) => {
          if (typeof verify === 'function') {
            const data = await save(Object.assign({}, item, { offset }))
            if (verify(data)) {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve(queue(offset + limit))
                }, timeout)
              })
            }
          }
        }
        return queue()
      }
      const count = Math.ceil(total / limit)
      const pages = new Array(count).fill(0).map((_, i) => {
        return Object.assign({}, page, { offset: start + i * limit, no: i + 1 })
      })
      return pages.map(async (page, index) => {
        setTimeout(async () => {
          await save(Object.assign({}, item, { type: `${type}-${page.no}`, page }))
        }, timeout + index * 5e2)
      })
    } else {
      return save(item)
    }
  })
}

main()
