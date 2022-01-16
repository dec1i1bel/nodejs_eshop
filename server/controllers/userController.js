class UserController {
    async registration(req, res) {

    }
    
    async login(req, res) {

    }

    async check(req, res) {
        const {id} = req.query;
        res.json(id);
    }
}

// модуль сразу отдаёт экземпляр класса, чтобы при его вызове
// можно было обращаться к методам через точку
module.exports = new UserController();