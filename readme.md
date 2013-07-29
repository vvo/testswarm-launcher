# testswarm-launcher

Command line testswarm launcher wrapping [node-testswarm](https://github.com/jzaefferer/node-testswarm)

```shell
npm install -g testswarm-launcher
```

## Usage

```shell
-> % testswarm-launcher -h

  Usage: testswarm-launcher [options]

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -c, --config <file>     Testswarm-launcher configuration file
    -n, --name <job name>   Testswarm job name, if you are in a CI env, you can put a GIT SHA
    -b, --baseurl [url]     Append this baseurl to every test file
    -q, --querystring [qs]  Append this querystring to every test url
```

## Configuration example

```json
{
  "id": "project-id",
  "token": "project-auth-token",
  "url": "http://testswarm.server.url.com",
  "runs": {
    "run name": "url"
  },
  "browserSets": ["desktop"]
}
```