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

  var form = {s: String, d: Number, j: JSON.stringify};

  function sprintf(format) {
    var i = 1;
    var str = format.replace(/%((%)|s|d|j)/g,
      (match, p1, p2) => p2 || (i < arguments.length ? form[p1](arguments[i++]) : match));
    while (i < arguments.length)
      str += ' ' + arguments[i++];
    return str;
  }

  console.log = function log() {
    arguments[0] = new Date().toTimeString().slice(0, 9) + arguments[0];
    var args = sprintf.apply(null, arguments);
    orgConsoleLog.call(console, '%s', args);
    writer.writeln(args);
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

