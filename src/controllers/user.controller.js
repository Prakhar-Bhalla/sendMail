const User = require("../models/user.model");

const Admin = require("../models/admin.model");

const express = require("express");

const sendmail = require("../util/send_mail");

const router = express.Router();

router.get("/", async(req, res) => {
    try{
        let page = req.query.page || 1;
        let size = req.query.size || 3;
        let skip = (page - 1) * size;
        const users = await User.find().skip(skip).limit(size).lean().exec();
        const total_docs = await User.find().countDocuments();
        const total_pages = Math.ceil(total_docs/size);
        res.json({users, total_pages});
    } catch(e){
        res.send({message: e.message});
    }
});

router.post("/", async(req, res) => {
    try{
        const user = await User.create(req.body);
        const admins = await Admin.find().populate("user_id").lean().exec();
        const array = admins.map((admin) => {
            return admin.user_id.email;
        }) 
        let string = array.join(",");
        sendmail("prakhar@g.com", user.email, `Welcome to ABC system ${user.first_name} ${user.last_name}`, `Hi ${user.first_name}, Please confirm your email address`, "");
        sendmail("prakhar@g.com", string, ` ${user.first_name} ${user.last_name} has registered with us`, `Please welcome ${user.first_name} ${user.last_name}`, "");
        
        res.json({user});
    } catch(e){
        res.send({message: e.message});
    }
});

module.exports = router;