const router = require('express').Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const fs = require("fs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth")
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({
    storage: storage
})

const cookie = require('cookie-parser')
router.use(cookie())

const signinRegistory = require('../models/signinreg')

router.get('/', (req, res) => {
    res.send("Server working")
})

router.post("/signin", upload.single('photo'), async (req, res, next) => {
    console.log(req.body.fn)
    if (req.body.fn) {
        var newRegister = signinRegistory({
            _id: new mongoose.Types.ObjectId(),
            fn: req.body.fn,
            email: req.body.email,
            password: req.body.password,
            photo: req.file.buffer,
            dob: req.body.dob,
            place: req.body.place
        })

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newRegister.password, salt);
        newRegister.password = hash;

        newRegister.save().then(result => {
            console.log("Registered")
            writestream = fs.createWriteStream("./tmp/img/profile.jpg")
            writestream.write(result.photo)
            console.log(result)
            res.status(201).json({
                photo: result.photo
            })
        })
    }
})

router.post("/login", (req, res, next) => {

    signinRegistory.find({
        email: req.body.email
    }).then(async result => {

        a = await bcrypt.compare(req.body.password, result[0].password);
        if (a) {
            var token = jwt.sign({
                _id: result[0]._id,
                
            }, "shaaa");
            res.status(201).json({token: token})
        } else {
            console.log("caught")
            res.status(201).json({message: false})
        }
    
    })

})

module.exports = router;