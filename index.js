const express = require('express');
const router = express();
const Controller = require('./Controllers/controller');

router.use(express.json());

router.get("/",(req,res) => {
    res.send("hello world");
});
router.get("/read_by_owner",async(req,res)=>{
    var data = req.body;
    var response = await Controller.find_by_owner(data);
    res.send(response);
});
router.post("/create_animal",async(req,res) => {
    const data = req.body;
    var status = await Controller.create_animal(data);
    res.send(status);
});
router.post("/create_client",async(req,res) => {
    const data = req.body;
    var status = await Controller.create_client(data);
    res.send(status);
});
router.put("/update_client",async(req,res)=>{
    const data = req.body;
    var status = await Controller.update_client(data);
    res.send(status);
});
router.delete("/delete_client",async(req,res) => {
    const data = req.body;
    var status = await Controller.delete_client(data);
    res.send(status);
});

router.listen(5000);
