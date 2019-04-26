const express = require('express');
const router = express.Router();
const User = require('../Models/user');
const Module = require('../Models/module');
const Task = require('../Models/task')
const Checklist = require('../Models/checklist');
const Attention = require('../Models/attention');
const Course = require('../Models/course');

router.post('/module', async function(req, res, next) {
    try {
      console.log(req.body);
      const deleteModule = await Module.findOneAndDelete({_id: req.body.moduleId});
      console.log(deleteModule);
      res.redirect('/admin');
    } catch(err) {
      next(err);
    }
})

router.post('/course', async function(req, res, next) {
    try {
      console.log(req.body);
      const deleteCourse = await Course.findOneAndDelete({_id: req.body.courseId});
      console.log(deleteCourse);
      res.redirect('/admin');
    } catch(err) {
      next(err);
    }
})

router.post('/task', async function(req, res, next) {
    try {
      console.log(req.body);
      const deleteTask = await Task.findOneAndDelete({_id: req.body.taskId});
      console.log(deleteTask)
      res.redirect('/admin');
    } catch(err) {
      next(err);
    }
})

router.post('/checklist', async function(req, res, next) {
    try {
      const deleteChecklist = await Checklist.findOneAndDelete({_id: req.body.checklistId});
      console.log(deleteChecklist);
      res.redirect('/admin');
    } catch(err) {
      next(err);
    }
})

router.post('/attention', async function(req, res, next) {
    try {
      const deleteAttention = await Attention.findOneAndDelete({_id: req.body.attentionId});
      console.log(deleteAttention);
      res.redirect('/admin');
    } catch(err) {
      next(err);
    }
})

module.exports = router;