const express = require('express');
const router = express();
const Animal_Controller = require('./Controllers/animais_controller');

router.use(express.json());

router.get("/",(req,res) => {
    res.send("hello world");
});
router.get("/read_by_owner",async(req,res)=>{
    var data = req.body;
    var response = await Animal_Controller.find_by_owner(data);
    res.send(response);
});
router.post("/create_animal",async(req,res) => {
    const data = req.body;
    var status = await Animal_Controller.create_animal(data);
    res.send(status);
});
router.post("/create_client",async(req,res) => {
    const data = req.body;
    var status = await Animal_Controller.create_client(data);
    res.send(status);
});
router.put("/update",async(req,res)=>{
    const data = req.body;
    var status = await Animal_Controller.update(data);
    res.send(status);
});
router.delete("/delete",async(req,res) => {
    const data = req.body;
    var status = await Animal_Controller.delete(data);
    res.send(status);
});

router.listen(5000);
