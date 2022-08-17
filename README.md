This is an application which allows readers to express their opinions by casting votes to various campaigns.

### Prerequisites

- Git
- NodeJS
- MongoDB
- Docker

### Env setting

- yarn

### VScode setting reference

use VScode plugin config on save use prettier formatting

```
https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

{
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "prettier.jsxSingleQuote": true,
    "prettier.useTabs": false,
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
}
```

### Installation

```
$ git clone https://github.com/jhforrubb/vote-backend.git
$ cd <project_name>
$ yarn

```

## Get started

To get start on local, start all dependencies first.

Create .env file in project root directory and fill it following .env.example file

```
make start-mongo
```

Run server on local, start with enviroment settings

```bash
yarn start
```

Stop all local dependencies

```cli
make stop-mongo
```

## Test

```
#unit tests
$yarn test

```

## API documentation

http://localhost:4000/api
