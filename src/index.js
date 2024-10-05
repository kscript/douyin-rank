const { list } = require('./config')
const { getData } = require('./fetch')
const { saveData } = require('./save')

const main = async () => {
  return list.map(async ({ url, type }) => {
    const data = await getData(url)
    if (data instanceof Object) {
      await saveData(type, data)
    }
  })
}

main()
