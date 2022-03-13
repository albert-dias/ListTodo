# To-do List
## _To-do list with database MySQL_

## Features

- Create a to-do list
- Being able to read tasks and delete them
- Data persistence in MySQL database

The system has a simple api for integration with the database where the business rule is all centralized in the api while our front end is only responsible for displaying, inserting and deleting tasks through the api

## Tech

To-do List uses a number of open source projects to work properly:

- ReactJS
- TypeOrm
- MaterialUI
- Node.js
- Express 

## Installation

To-do List requires [Node.js](https://nodejs.org/) v10+ to run.

Once you clone the project you will have both the back end and the web application, run them following the steps below
Install the dependencies and devDependencies and start the server.

Create an "todos" database and configure your credentials in the ormconfig.json that is in the root of the project

```sh
cd back
yarn "or" npm -i
yarn typeorm migration:run
yarn dev "or" npm run dev
```

For the web app...

In another tab of the terminal access the web folder

```sh
cd web
yarn "or" npm -i
yarn start "or" npm run start
```


## License

MIT