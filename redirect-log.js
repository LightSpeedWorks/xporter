// redirect-log.js

'use strict';

module.exports = exports = redirectLog;

function redirectLog(dir, id) {
  if (dir == null) dir = '/tmp/log';
  if (id == null) id = 'log';

  var path = require('path');

  var slice = [].slice;

  var orgConsoleLog = console.log;

  var LogWriter = require('./log-writer');
  var writer = new LogWriter(path.resolve(dir, id + '-%s.log'));
  //writer.write('write\r\n');
  //writer.writeln('writeln');
  //writer.end();

  function sprintf(format, etc) {
    var arg = arguments;
    var i = 1;
    return format.replace(/%((%)|s|d|j)/g, function (m) { return m[2] || arg[i++] })
  }

  console.log = function log() {
    orgConsoleLog.apply(console, arguments);
    var args = sprintf.apply(null, arguments);
    var msg = new Date().toTimeString().slice(0, 9) + args;
    writer.writeln(msg);
  }

  writer.writeln('-------- start');

  process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err.stack + '\r\n-------- uncaughtException');
    process.exit();
  });

  process.on('exit', function(code) {
    console.log('exit: code ' + code + ' 0x' + code.toString(16) + '\n-------- exit');
  });

}

