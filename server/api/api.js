const canned = require('canned');
const http = require('http');
const opts = { 
	logger: process.stdout,
	cors: true,
    cors_headers: ["Content-Type", "Location"],
     };

can = canned('C:/Dev/javascript/reactjs/auction/server/api/mocks', opts)

http.createServer(can).listen(3000);