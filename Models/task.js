const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bigImg = ['boxes', 'mind', 'smth else??'];

const TaskSchema = new Schema({
    type: String,
    duration: String,
    header: String,
    img: {type: String, enum: bigImg},
    view: {type: String, required: true}
})

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;