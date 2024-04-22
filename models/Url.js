const mongoose = require('mongoose');
const shortId = require('shortid');

const Schema = mongoose.Schema;

const urlSchema = new Schema({
    urlOriginal: {
        type: String,
        lowercas: true,
        trim: true
    },
    urlCorta: {
        type: String,
    }
    
})


//metodos de mongoose

urlSchema.pre('save', async function (next) {
    //generar url corta
    this.urlCorta = shortId.generate();
    next();
});

module.exports = mongoose.model('Urls', urlSchema);
