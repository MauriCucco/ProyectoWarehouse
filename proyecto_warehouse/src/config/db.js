const { host, database, dbPort } = require("../config/config");
const mongoose = require('mongoose');

mongoose.connect(`mongodb://${host}:${dbPort}/${database}`, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log("Conectado a la base de datos!!"));

module.exports = mongoose;