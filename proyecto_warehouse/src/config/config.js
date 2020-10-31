require("dotenv").config();

const jwtClave = process.env.TKS;
const puerto = process.env.PORT;
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const dbPort = process.env.DB_PORT;
const database = process.env.DB_DATABASE;

module.exports = {
    jwtClave,
    puerto,
    host,
    user,
    dbPort,
    database
}