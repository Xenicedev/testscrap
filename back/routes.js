module.exports = function (app) {
    require('./controllers/authentification')(app);
    require('./controllers/products')(app);
    require('./controllers/scrap')(app);
    require('./controllers/keys')(app);
    
    app.get('*', function(req, res){
        res.status(404).json(-4);
    });
}