const http = require('http')

const data = JSON.stringify(
    {
        author: "jalfjlajdl",
        location: "jlvjlsjl",
        industry: "lkdjaljfl",
        details: "jdldajslfjaldj",
        selectedDate: "2000-10-31T18:30:00.000Z",
        keyword: [
          "B",
          "A",
          "C",
          "D"
        ],
        type: "ljafldj"
      }
);

const options = {
hostname: 'localhost',
port: 8080,
path: '/form',
method: 'POST',
headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
}
}

const req = http.request(options, res => {
console.log(`statusCode: ${res.statusCode}`)

res.on('data', d => {
    process.stdout.write(d)
})
})

req.on('error', error => {
console.error(error)
})

req.write(data)
req.end()
