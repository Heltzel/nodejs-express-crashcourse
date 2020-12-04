const http = require('http')
const fs = require('fs')
const _ = require('lodash')

const server = http.createServer((request, respons) => {
  // lodash
  const num = _.random(0, 20)
  console.log(num)
  // set content type
  respons.setHeader('Content-Type', 'text/html')
  // router
  let path = './views/'
  switch (request.url) {
    case '/':
      path += 'index.html'
      respons.statusCode = 200
      break
    case '/about':
      path += 'about.html'
      respons.statusCode = 200
      break
    case '/about-us':
      respons.statusCode = 301
      respons.setHeader('Location', '/about')
      respons.end()
      break
    default:
      path += '404.html'
      respons.statusCode = 404
      break
  }

  // send a html filed
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err)
      respons.end()
    } else {
      // respons.write(data)
      respons.end(data)
    }
  })
})
server.listen(3000, 'localhost', () => {
  console.log('Listening for requests on port 3000')
})
