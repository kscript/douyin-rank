const fetch = require('node-fetch')

const getData = async (url, options) => {
  options = options instanceof Object ? options : {}
  let retry = +options.retry || 5
  delete options.retry
  const query = () => {
    return fetch(url, options)
      .then(res => res.json())
      .catch(error => {
        console.error(error)
        if (--retry) {
          return new Promise((resolve) => {
            setTimeout(() => resolve(query()), 1e4)
          })
        }
        return {
          success: false,
          message: error.toString()
        }
      })
  }
  return query()
}

Object.assign(exports, {
  getData
})
