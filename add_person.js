// const pg = require("pg");
const settings = require("./settings"); // settings.json
const userInput = process.argv.slice(2);
// console.log(userInput[0]);
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
    ssl: settings.ssl
  }
});
knex.select('id', 'first_name', 'last_name', knex.raw("to_char(birthdate, 'YYYY-DD-MM') as birthdate")).from('famous_people').where('last_name', userInput[0]).asCallback((err, results) => {
  if (err) {
    return console.error("error running query", err);
  }
  const result = results[0];
  console.log(`- ${result.id}: ${result.first_name} ${result.last_name}, born '${result.birthdate}'`);
});