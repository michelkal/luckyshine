# LUCKYSHINE TREASURE GAME

## Intrduction
LuckyShine is a game where users can collect treasures in a given latitude and longitude. Every
treasure that is collected will have points based on the monetary value. A treasure may have
more than one money value, it depends on the user’s luck. Lucky users may get the highest
money from the treasure that has been collected.

## Task
- You are required to create two api endpoints using NodeJS and your preferred
framework (ExpressJS, HapiJS etc.)
- You are required to give us steps on how to run your web application. (THIS!)
- You may use any libraries to assist your development.

## Prerequisite 
* Create a migration/seeding for the MySQL tables

## SOLUTION
This mini project was built with [Node.js](https://nodejs.org), using [ExpressJS](https://expressjs.com) Framework.
To run this project, you're required to have Node.js installed on your machine and MYSQL or MariaDB

Other extensions used to facilate the development process (to name a few) are:
* Mysql (for database server)
* Knex (for seeding and migrations)
* Jwt  - Json Web Token (For tokenizing request)
* Dotenv (For storing environment variables like DB connection settings)
* Express validator (For requests validation)
* Nodemon (For watching file change and automatically restart the process)
* Bcrypt (for password encryption)
* Cors (To allow cross-origin requests)

All of these dependencies are available in the `package.json` file, you do not need to install them manually.

## HOW TO SET UP THE APPLICATION ON YOUR LOCAL ENVIRONMENT
- Clone the repository
- `cd luckyshine`
- `npm install`
- Rename .env.example to .env (`mv .env.example .env` if you're using a Unix based OS)
- Open `.env` with your IDE, change the DB connection details to yours

##### RUN DATABASE MIGRATION
I created some migration files which represent your database tables. After changing the DB connection in the `.env` file (you should have created your DATABASE also inside your Mysql server).
To migrate the tables (users, treasures, money_values) run:
`npx knex migrate:latest --env development --knexfile knexfiles.js`
Note, here I used `npx` and not `npm`, this is because `knex` was not install globally (`npx` will read within node module)

#### SEED THE SAMPLE DATA FOR THE TABLES YOU JUST CREATED
Using `knex` I also created some sample data (provided in the assignment) to populate the tables listed above.
To insert these data, run:
`npx knex seed:run --env development --knexfile knexfiles.js`

## RUN THE APPLICATION
If all went well as described in the steps above, run the application:
`npm start`
And the outcome should be something like this:</br>
`> LuckyShine@1.0.0 start ../../luckyShine`</br>
`> nodemon luckyshine.js`</br>

`[nodemon] 2.0.2`</br>
`[nodemon] to restart at any time, enter "rs"`</br>
`[nodemon] watching dir(s): *.*`</br>
`[nodemon] watching extensions: js,mjs,json`</br>
`[nodemon] starting "node luckyshine.js"`</br>
`LuckyShine app is listening on port 3000`</br>
`Successfully connected to the database == [ID]`</br>

All good now, there's a simple [Postman collection](https://documenter.getpostman.com/view/139351/TVzXAaCn) that contains 3 endpoints for testing the application:
- USER LOGIN - authenticate user with name, password and email. Once successfully authenticated, a JWT token is provided that would be used as `Authorization` header for subsequent request. (This was created as a bonus endpoint)
Note: Token expired after 24 hours
- TREASURE SEARCH - Find treasure within a given distance for a given coordinate (latitude and longitude)
- FIND TREASURE WITH MONEY VALUE - Find treasure within a given distance for a given coordinate (latitude and longitude) and prize

## AUTOR INFO
* Name: Michel Kalavanda
* Email: michelkalavanda@gmail.com