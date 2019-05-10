const bdd = require(`../bdd`);

module.exports = function (app) {
    app.get('/keys', getall);
    app.get('/keys/id', getid);
    app.delete('/keys', remove);
}

function getall(req, res){
    bdd.Keys.Find({}, (err, data) => res.json(err ? -1 : data));
};

function getid(req, res){
    if (req.query.id === undefined)
        return(res.status(400).json(-1));
    bdd.Keys.FindOne({_id: req.query.id}, (err, data) => res.json(err ? -1 : data));
};

function remove(req, res){
    if (req.query.id === undefined)
        return(res.status(400).json(-1));
    bdd.Keys.Remove({_id: req.query.id}, (err) => res.json(err ? -1 : 1));
};