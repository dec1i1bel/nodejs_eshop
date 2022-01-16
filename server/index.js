require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index');

const PORT = process.env.PORT || 5432; 

const app = express();
app.use(cors());
// для парсинга данных в json:
app.use(express.json());
// подключаем роутинг из переменной router
app.use('/api', router);

app.get('/', (req, res) => {
    res.status(200).json(
        {
            message: 'working'
        }
    )
});

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