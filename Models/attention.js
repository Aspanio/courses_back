const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const img = ['hospital', 'sleep', 'swim']

AttentionsSchema = new Schema({
    img: {type: String, enum: img},
    header: String,
    content: String,
})

const Module = mongoose.model('Attention', AttentionsSchema);
module.exports = Module;