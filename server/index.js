require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const PORT = process.env.PORT || 5432;

const app = express();

// все операции с БД являются асинхронными
const start = async() => {
    try {
        // подключение к БД
        await sequelize.authenticate();

        // сверяет состояние БД со схемой данных
        await sequelize.sync();

        app.listen(PORT, () => console.log('server started at port ' + PORT));
    } catch (e) {
        console.log(e);
    }
}

start();