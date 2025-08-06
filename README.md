# Installation #
To Install run

```bash
git clone git@github.com:zan-chi/Typescript-template.git project-name
cd project-name


```

```bash
npm init &&
npm install typescript ts-node nodemon @types/node --save-dev
npm run watch
```
In the Package.json add the following inside script
```json
"watch":"nodemon",
"build":"tsc",
"test": "echo \"Error: no test specified\" && exit 1",
```