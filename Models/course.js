const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    header: String,
    module_ids: [{type: ObjectId, unique: true}]
});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;