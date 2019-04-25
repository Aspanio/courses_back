const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const roles = ['admin', 'user', 'coach'];
const sex = ['male', 'female'];

const CoursesSchema = new Schema({
    courseId: [ObjectId],
    expDate: Number,
})

const ChildrenSchema = new Schema({
    name: String,
    age: Number,
    sex: sex,
})

const ProfileSchema = new Schema({
    name: String,
    children: [ChildrenSchema],
    progress: Number,
    img: String,
});



const UserSchema = new Schema({
    email: String,
    pwd: String,
    role: {type: String, default: 'user', enum: roles},
    orders: [ObjectId],
    profile: ProfileSchema,
    courses: [CoursesSchema],
})

const User = mongoose.model('User', UserSchema);
module.exports = User;