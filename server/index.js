require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileupload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');

const PORT = process.env.PORT || 5000; 

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileupload({}));
app.use('/api', router);

/*
* вызов обработчика ошибки должен быть в конце. в нём не вызывался next,
* так как после него нет других middleware
* */
app.use(errorHandler);

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