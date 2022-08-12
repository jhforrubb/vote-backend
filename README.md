### Env setting

-   yarn

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

## Get started

To get start on local, start all dependencies first.

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