const router = require('express').Router();
const cookie = require('cookie-parser')
router.use(cookie())
const auth = require("../../middleware/auth")
const tests = require('../models/test')
const signinRegistory = require('../models/signinreg')
const photoFeed = require('../models/photofeed')
const fs = require('fs')

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({
    storage: storage
})

router.post('/', (req, res) => {
    console.log(auth.tokenauth(req.body.token))
    if (auth.tokenauth(req.body.token)) {
        signinRegistory.findById(auth.tokenauth(req.body.token), ('fn dob place')).then(result => {
            console.log(result)
            res.status(201).json(result)
        })
    } else {
        res.status(500).json({
            auth: false
        })
    }
})

router.post('/post', upload.single('postimage'), (req, res) => {
    id = auth.tokenauth(req.body.token);
    if (id) {
        months = {
            1: "Jan",
            2: "Feb",
            3: "Mar",
            4: "Apr",
            5: "May",
            6: "Jun",
            7: "Jul",
            8: "Aug",
            9: "Sep",
            10: "Oct",
            11: "Nov",
            12: "Dec"
        }
        date = new Date();
        var newFeed = photoFeed({
            userid: auth.tokenauth(req.body.token),
            name: "",
            postimage: req.file.buffer,
            date: date.getDate() + " " + months[(date.getMonth() + 1)],
            desc: req.body.desc
        })
        signinRegistory.find({
            _id: id
        }).then(result => {
            newFeed.name = result[0].fn
            newFeed.save().then(result => {
                console.log(result.name)
                res.status(201).json({
                    Message: "got"
                })
            })
        })
    } else {
        res.status(201).json({
            Message: "Bad request"
        })
    }
})

router.post("/profilefeed", (req, res) => {
    id = auth.tokenauth(req.body.token);
    if (id) {
        photoFeed.find({
            userid: id
        }).then(result => {
            for (i = 0; i < result.length; i++) {
                writestream = fs.createWriteStream("./tmp/img/" + (i + 1) + result[i].userid + "feed.jpg")
                writestream.write(result[i].postimage)
                result[i].postimage = ""
                result[i].url = "http://localhost:3000/tmp/img/" + (i + 1) + result[i].userid + "feed.jpg"
            }
            console.log(result)
            res.status(201).json(result)
        })
    } else {
        res.status(201).json({
            message: "not found"
        })
    }
})

router.post("/allfeed", (req, res) => {
    id = auth.tokenauth(req.body.token);
    if (id) {
        photoFeed.find({}).then(result => {
            for (i = 0; i < result.length; i++) {
                writestream = fs.createWriteStream("./tmp/img/" + (i + 1) + result[i].userid + "feed.jpg")
                writestream.write(result[i].postimage)
                result[i].postimage = ""
                result[i].url = "http://localhost:3000/tmp/img/" + (i + 1) + result[i].userid + "feed.jpg"
            }
            console.log(result)
            res.status(201).json(result)
        })
    } else {
        res.status(201).json({
            message: "not found"
        })
    }
})

module.exports = router;