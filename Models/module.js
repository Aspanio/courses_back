const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const ModuleSchema = new Schema({
    name: String,
    objectives: [String],
    tasks: [{type: ObjectId, ref: 'Task'}],
    extra_tasks: [{type: ObjectId, ref: 'Task'}],
    checklist: [{type: ObjectId, ref: 'Checklist'}],
    dangerlist: [{type: ObjectId, ref: 'Checklist'}],
    dangerlist_header: String,
    attentions: [{type: ObjectId, ref: 'Attention'}],
    shortDesc: {
        desc: { type: String },
        years: Number,
        months: Number,
    },
});

const Module = mongoose.model('Module', ModuleSchema);
module.exports = Module;
