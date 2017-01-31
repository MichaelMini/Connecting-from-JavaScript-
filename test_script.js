const pg = require("pg");
const settings = require("./settings"); // settings.json
const userInput = process.argv.slice(2);

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE last_name = $1::text", userInput, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    const results = result.rows[0]
    console.log(`- ${results.id}: ${results.first_name} ${results.last_name}, born '${results.birthdate}'`  ); //output: 1
    client.end();
  });
});