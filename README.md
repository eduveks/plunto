![Logo](https://raw.githubusercontent.com/eduveks/plunto/main/docs/logo.svg)

# plunto web chat

Moderated and multi-room web chat.

<div align="center">
  <a href="https://www.youtube.com/watch?v=vNsiDW71GX0"><img src="https://raw.githubusercontent.com/eduveks/plunto/main/docs/demo.gif" alt="Plunto Demo"><br/>
  Check out the full video here.</a>
</div>

## Installation

The requirements and the server, easy-peasy:

- [Netuno Platform Install](https://doc.netuno.org/docs/en/installation/);

#### Automatic

In your terminal, execute the command below into the Netuno root folder to install and autoconfigure the application:

```
./netuno app github=eduveks/plunto
```

> This requires GIT command.

Then start the Netuno with the Pluto application:

```
./netuno server app=plunto
```

> At first time will take some time because of the auto-execution of the NPM installs.

#### Manual

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

```
./netuno server app=plunto
```

> At the first time, may execute the NPM installs automatically.

## Local Development Links

After starting the Pluto application and finished the NPM installs, these links below will be available.

Backoffice:
 - http://localhost:9000/

Website:
 - http://localhost:3000/

🙌 have fun.
