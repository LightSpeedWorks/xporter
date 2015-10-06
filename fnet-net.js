'use strict';
var CONFIG_DIR = process.argv[2] || '/tmp/proxy_wk';
var HTTP_PORT  = process.argv[3] || 8080;  // service port
var PROXY_HOST = process.argv[4] || null;  // proxy server host
var PROXY_PORT = process.argv[5] || 80;    // proxy server port
require('./redirect-log')(CONFIG_DIR, 'proxy');
var net  = require('net');
var fnet = require('./fnet');
var aa   = require('aa');

if (!PROXY_HOST) return console.log('proxy server not found');

// title �^�C�g��
if (process.title.indexOf('; ') > 0)
  process.title = process.title.slice(process.title.indexOf('; ') + 2);
process.title = 'proxy ' + HTTP_PORT +
  ' -> ' + PROXY_HOST + ':' + PROXY_PORT +
  '; ' + process.title;

fnet.setConfig({dir: CONFIG_DIR});

var server = fnet.createServer(function onCliConn(cliSoc) {
  var cliChan = aa();
  var svrChan = aa();
  var svrSoc = net.connect(PROXY_PORT, PROXY_HOST);
  svrChan.stream(svrSoc); // svrChan <- svrSoc
  cliChan.stream(cliSoc); // cliChan <- cliSoc

  // start thread for svrChan <- svrSoc
  aa(function*(){
    try {
      while (!svrChan.done()) {
        var buf = yield svrChan;
        if (buf === svrChan.empty) break;
        if (buf) cliSoc.write(buf);
      }
    } catch (err) {
      console.log('%s svrSoc: %s', new Date().toLocaleTimeString(), err);
    } finally {
      cliSoc.end();
      cliChan.close();
    }
  })();

  // start thread for cliChan <- cliSoc
  aa(function*(){
    try {
      while (!cliChan.done()) {
        var buf = yield cliChan;
        if (buf === cliChan.empty) break;
        if (buf) svrSoc.write(buf);
      }
    } catch (err) {
      console.log('%s cliSoc: %s', new Date().toLocaleTimeString(), err);
    } finally {
      svrSoc.end();
      svrChan.close();
    }
  })();
}).listen(HTTP_PORT, function () {
  process.on('uncaughtException', function (err) {
    var msg1 = /\n    at exports._errnoException \(util.js:\d*:\d*\)\n    at TCP.onread \(net.js:\d*:\d*\)/;
    console.log('uncExc %s', err.stack.replace(msg1, ''));
  });
});

server.on('error', function onSvrErr(err) {
  console.log('%s svrErr: %s', new Date().toLocaleTimeString(), err);
}); // server.on error

console.log('port forwarder started on port ' + HTTP_PORT +
            ' -> ' + PROXY_HOST + ':' + PROXY_PORT);
