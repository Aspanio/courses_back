const express = require('express');
const router = express.Router();
const User = require('../Models/user');
const Module = require('../Models/module');
const Task = require('../Models/task')
const Checklist = require('../Models/checklist');
const Attention = require('../Models/attention');
const Course = require('../Models/course');
const mongoose = require('mongoose');

function wrap(fn) {
  return function(req, res, next) {
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    // middleware in the chain, in this case the error handler.
    fn(req).then(returnVal => res.send(returnVal)).catch(next);
  };
}

router.get('/', function(req, res, next) {
  console.log('/')
  res.json({
    themes: 123,
    themesDone: 16
  })
});

router.post('/user', function(req, res, next) {
  console.log('POST -> /user')
  
})

router.post('/module', async function(req, res, next) {
  try {
    let { name, objective, extraTaskId, taskId, checklistId, dangerlistId, dangerlist_header, attentionId, shortDesc, shortDescYears, shortDescMonths,  } = req.body
    const shortDescObj = {
      desc: shortDesc,
      years: shortDescYears,
      months: shortDescMonths,
    };
    taskId.shift();
    extraTaskId.shift();
    const newModule = await new Module({
      name,
      objectives: objective,
      tasks: taskId,
      extra_tasks: extraTaskId,
      checklist: checklistId,
      dangerlist: dangerlistId,
      dangerlist_header,
      attentions: attentionId,
      shortDesc: shortDescObj,
    })
    const module = await newModule.save();
    console.log(module)
    res.send('ok');
  }
  catch(err) {
    console.log(err)
    next(err);
  }
})

router.post('/task', async function(req, res, next) {
  try {
    const {
      task_text,
      task_duration,
      task_img,
      task_view,
    } = req.body;
    const newTask = await new Task({
      duration: task_duration,
      header: task_text,
      img: task_img,
      view: task_view,
    });
    const task = await newTask.save();
    console.log(task);
    res.status(201).redirect('/admin')
    
  } catch(err) {
    next(err);
  }
})

router.post('/checklist', async function(req, res, next) {
  try {
    const { checklist_header, checklist_text } = req.body;
    const newChecklist = await new Checklist({
      header: checklist_header,
      text: checklist_text,
    })
    const checklist = await newChecklist.save();
    console.log(checklist);
    res.status(201).redirect('/admin')
  } catch(err) {
    next(err);
  }
})

router.post('/dangerlist', async function(req, res, next) {
  try {
    const { dangerlist_header, dangerlist_text } = req.body;
    const newChecklist = await new Checklist({
      header: dangerlist_header,
      text: dangerlist_text,
    })
    const checklist = await newChecklist.save();
    console.log(checklist);
    res.status(201).redirect('/admin')
  } catch(err) {
    next(err);
  }
})

router.post('/attention', async function(req, res, next) {
  try {
    const { attention_header, attention_text, attention_img } = req.body;
    const newAttention = await new Attention({
      header: attention_header,
      text: attention_text,
      img: attention_img,
    })
    const attention = await newAttention.save();
    console.log(attention);
    res.status(201).redirect('/admin')
  } catch(err) {
    next(err);
  }
})

router.post('/course', async function(req, res, next) {
  try {
    let { moduleId, header } = req.body;
    moduleId.shift();
    const newCourse = await new Course({
      header,
      module_ids: moduleId
    })
    const course = newCourse.save();
    console.log(course);
    res.send('Новый курс добавлен успешно!');
  } catch(err) {
    next(err);
  }
})


router.get('/modules', async function(req, res, next) {
  try {
    const modules = await Module.find({});
    res.json(modules);
  } catch (err) {
    next(err);
  }
})

router.get('/modules/tasks', function(req, res, next) {
  console.log('tasks back')
  res.json([
    {text: 'Тут задача 1'},
    {text: 'Тут задача 2'}
  ])
})

router.get('/tasks', wrap(async function(req, res, next) {
  try {
    const data = await Task.find({})
    console.log(data)
    return data;
  } catch(err) {
    next(err)
  }
}))

router.get('/checklist', wrap(async function(req, res, next) {
  try {
    const data = await Checklist.find({})
    return data;
  } catch(err) {
    next(err)
  }
}))

router.get('/attention', async function(req, res, next) {
  try {
    const data = await Attention.find({})
    console.log(data)
    res.send(data);
  } catch(err) {
    next(err)
  }
})

router.get('/module/:id', async function(req, res, next) {
  try {
    const _id = req.params.id;
    console.log(_id)
    const module = await Module.find({_id}).populate(['Task', 'Checklist', 'Attention']).exec();
    console.log(module);
    res.send(module);
  } catch(err) {
    next(err);
  }
})


module.exports = router;
