var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer();
var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;
var distPath = path.resolve(__dirname, 'dist');

app.use(express.static(distPath));

app.all('auction/search/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:3000'
    });
});

if (!isProduction) {

    var bundle = require('./server/bundle.js');
    bundle();

    app.all('/index.html', function (req, res) {
        proxy.web(req, res, {
            target: 'http://localhost:8080/dist/index.html'
        });
    });

}


proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again...');
});

app.listen(port, function () {
    console.log('Server running on port ' + port);
});