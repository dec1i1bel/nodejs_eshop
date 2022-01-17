const ApiError = require('../error/ApiError');

//next - ссылка на следующий middleware, переход после окончания работы текущего
//здесь его не описываем, так как данный middleware будет последним из вызванных
module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({
            message: err.message
        });
    }
    return res.status(500).json({
        message: 'Непредвиденная ошибка'
    })
};