module.exports = function (path) {
    const Schemas = require(`./schemas/${path}.js`);
    let module  = {};

    module.Find = (params, callback) => {
        Schemas.find(params, callback);
    };

    module.FindOne = (params, callback) => {
        Schemas.findOne(params, callback);
    };

    module.Create = (data, callback) => {
        (new Schemas(data)).save(callback);
    };

    module.Update = (act_data, data, callback) => {
        act_data = Object.assign(data, act_data);
        act_data.save(callback);
    };

    module.UpdateOrCreate = (params, data, callback) => {
        Schemas.findOneAndUpdate(params, data, {upsert: true, new: true, setDefaultsOnInsert: true}, callback);
    }
    
    return module;
}