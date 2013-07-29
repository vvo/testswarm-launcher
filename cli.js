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
    .option('-b, --baseurl [url]',
        'Append this baseurl to every test file',
        process.env.BASEURL
    )

program
    .option('-q, --querystring [qs]',
        'Append this querystring to every test url',
        process.env.QUERYSTRING
    )

program.parse(process.argv);

if (!program.config || !program.name) {
  program.help();
}

var config = require(path.resolve(program.config));
var launcher = require('./lib.js');
var util = require('util');

if (program.baseurl) {
  Object.keys(config.runs).forEach(function(name) {
    config.runs[name] = program.baseurl + config.runs[name];
  });
}

if (program.querystring) {
  Object.keys(config.runs).forEach(function(name) {
    var url = require('url');
    var qs = require('querystring');
    var merge = require('deepmerge');

    var u = url.parse(config.runs[name], true);
    u.query = merge(
      u.query,
      qs.parse(program.querystring)
    );

    // we must delete u.href an u.search for format to re-compute them
    // from the update querystring
    delete u.href;
    delete u.search;

    config.runs[name] = url.format(u);
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