var testswarm = require('testswarm');

module.exports = function(config, cb) {
  testswarm
    .createClient({
      url: config.url
    })
    .addReporter(testswarm.reporters.cli)
    .auth({
      id: config.id,
      token: config.token
    })
    .addjob({
      name: config.name,
      runs: config.runs,
      browserSets: config.browserSets
    }, cb);
}