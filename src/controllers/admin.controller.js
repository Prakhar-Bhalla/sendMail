const Admin = require("../models/admin.model");

const express = require("express");

const router = express.Router();

router.post("/", async(req, res) => {
    try{
        const admin = await Admin.create(req.body);
        res.json({admin});
    } catch(e){
        res.send({message: e.message});
    }
});

router.get("/", async(req, res) => {
    try{
        const admins = await Admin.find().populate("user_id").lean().exec();
        res.json({admins});
    } catch(e){
        res.send({message: e.message});
    }
});

module.exports = router;