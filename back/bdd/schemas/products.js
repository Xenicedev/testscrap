const mongoose = require('mongoose');        

const schema =  mongoose.Schema({
    source: {
        id: {type: String},
        date: {type: Date}
    },
    name: {type: String, required: true},
    description: {type: String},
    pictures: [{type: String}],
    price: {type: Number, default: 0},
    management: {
        updated_at: {type: Date, default: Date.now},
        created_at: {type: Date, default: Date.now}
    }
});

module.exports = mongoose.model('products', schema);