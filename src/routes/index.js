const { Router } = require('express');
const route = Router();
const Task = require('../models/task');


route.get('/', async (req, res) => {
    //res.send("Hello wolrd!");
    let tasks = await Task.find();
    console.log(tasks);
    res.render('index', {
        tasks
    });    //no le digo la ruta porque en la app ya sabe donde esta
});

route.post('/add', async (req, res) => {
    console.log(JSON.parse(JSON.stringify(req.body)));
    let task = new Task(req.body);
    await task.save();
    //res.send('recibido correctamente');
    res.redirect('/');
});

route.get('/turn/:id', async(req, res) => {
    const {id} = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');
});


route.get('/edit/:id', async (req, res) => {
    const {id} = req.params;
    const task = await Task.findById(id);
    res.render('edit', { task });
});

route.post('/edit/:id', async (req, res) => {
    // console.log(req.body);
    // console.log(req.param);
    //res.send('vamo bien');
    const {id} = req.params;
    await Task.update({_id: id} , req.body);
    res.redirect('/');

});

route.get('/delete/:id', async (req, res) =>{
    //console.log(req.params);
    const {id} = req.params;
    $res = await Task.findByIdAndDelete({_id: id});

    res.redirect('/');
});




module.exports = route;