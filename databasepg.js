const {Pool} = require('pg')

const client = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "",
    database: "testApp"
})

module.exports = client