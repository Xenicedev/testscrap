const bdd = require(`../bdd`);

module.exports = function (app) {
    app.use('/', check_key);
}

function check_key (req, res, next) {
    bdd.Keys.FindOne({key: req.headers['x-authorization'], enabled: true}, (err, data) => {err ? res.status(401).json(-2) : next()});
};