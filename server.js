var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer();
var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3003;
var distPath = path.resolve(__dirname, 'dist');

if (!isProduction) {

    var bundle = require('./server/bundle.js');
    bundle();

    app.all('/*', function (req, res) {
        proxy.web(req, res, {
            target: 'http://localhost:8080/dist/'
        });
    });

} else {
    app.use(express.static(distPath));
}

proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again...');
});

app.listen(port, function () {
    console.log('Server running on port ' + port);
});