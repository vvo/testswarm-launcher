#!/usr/bin/env node
var testswarm = require('testswarm');

var program = require('commander');
var pjson = require('./package.json');
var path = require('path');

program
    .version(pjson.version);

program
    .option('-c, --config <file>',
        'Testswarm-launcher configuration file',
        process.env.CONFIG
    )

program
    .option('-n, --name <job name>',
        'Testswarm job name, if you are in a CI env, you can put a GIT SHA',
        process.env.NAME
    )

program
    .option('-F, --format [url]',
        'Let you reformat runs url at will, %s is the original run url',
        process.env.FORMAT
    )

program.parse(process.argv);

if (!program.config || !program.name) {
  program.help();
}

var config = require(path.resolve(program.config));
var launcher = require('./lib.js');
var util = require('util');

if (program.format) {
  Object.keys(config.runs).forEach(function(name) {
    config.runs[name] = util.format(program.format.trim(), config.runs[name]);
  });
}

config.name = program.name;

launcher(config, end);

function end(err, passed, res) {
  if (err || passed !== true) {
    throw new Error('Some tests did not pass' );
  } else {
    console.log('All tests were OK');
  }
}