const mongoose = require('mongoose');        
const utils = require(`../../helpers/utils`);

const schema =  mongoose.Schema({
    name: {type: String, required: true, unique: false, trim: true},
    key: {type: String, required: false, unique: true, trim: true},
    enabled: {type: Boolean, default: true},
    created_at: { type: Date, default: Date.now }
});

schema.pre('save', function(next) {
    this.key = utils.generateToken();
    next();
});

module.exports = mongoose.model('keys', schema);