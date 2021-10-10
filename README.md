![Logo](https://raw.githubusercontent.com/eduveks/plunto/main/docs/logo.svg)

# plunto web chat

Moderated and multi-room web chat.

## Installation

The requirements and the server, easy-peasy:

- [Netuno Platform Install](https://doc.netuno.org/docs/en/installation/);

Clone this project inside of the `apps` folder in the Netuno root, for example:

```
cd netuno/apps
git clone https://github.com/eduveks/plunto.git
```

And set the configurations inside of the Plunto app folder:

```
cd netuno/apps/plunto
```

Copy from base configuration and edit to make your own adjustments:

```
cp config/sample.json config/_development.json
```

Now just need to start the Netuno Server, but with the Plunto Web Chat as the main application:

`./netuno server app=plunto`

> At the first time, may execute the NPM installs automatically.

### Local Links

Backoffice:
 - http://localhost:9000/
Website:
 - http://localhost:3000/
