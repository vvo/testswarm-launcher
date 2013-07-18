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

    -h, --help             output usage information
    -V, --version          output the version number
    -c, --config <file>    Testswarm-launcher configuration file
    -n, --name <job name>  Testswarm job name, if you are in a CI env, you can put a GIT SHA
    -F, --format [url]     Let you reformat runs url at will, %s is the original run url
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