const bdd = require(`../bdd`);

module.exports = function (app) {
    app.get('/products', getall);
    app.get('/products/id', getid);
    app.post('/products', add);
}

function getall(req, res){
    bdd.Products.Find({}, (err, data) => res.json(err ? -1 : data));
};

function getid(req, res){
    if (req.query.id === undefined)
        return(res.status(400).json(-1));
    bdd.Products.FindOne({_id: req.query.id}, (err, data) => res.json(err ? -1 : data));
};

function add(req, res){

}