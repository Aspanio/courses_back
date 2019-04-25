const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChecklistSchema = new Schema({
    header: String,
    text: [String],
})

const ChecklistModel = mongoose.model('Checklist', ChecklistSchema);
module.exports = ChecklistModel;