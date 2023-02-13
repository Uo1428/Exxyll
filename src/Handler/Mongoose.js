const mongoose = require('mongoose');
const chalk = require('chalk');
require('dotenv').config();


mongoose
    .connect(process.env.MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log(`${chalk.grey.bold('[INFO]  ')}${chalk.green.bold('Connected to the database!')}`));
