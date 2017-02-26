                                                                                                                                                                                    const express = require('express');
const app = express();

function setHeaders(res) {
  res.setHeader('Content-Type', 'application/json');
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

app.get('/bundle.js', (req, res) => {
	console.log(__dirname);
  res.sendFile(__dirname + '/dist/bundle.js')
})

app.get('/vendor.js', (req, res) => {
	console.log(__dirname);
  res.sendFile(__dirname + '/dist/vendor.js')
})


// res.setHeader('Content-Type', 'application/json');
// res.send(JSON.stringify({ a: 1 }));

app.listen(8080);                                                   