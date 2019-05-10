const ctrl = module.exports;
const mongoose = require("mongoose");
const bdd = require("../config/bdd.json");

mongoose.connect(`mongodb+srv://${bdd.username}:${bdd.password}@${bdd.server}/${bdd.database}`, {useNewUrlParser: true});

ctrl.Products = require('./actions')('products');
ctrl.Keys = require('./actions')('keys');