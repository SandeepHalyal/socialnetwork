const mongoose= require('mongoose')

const photoFeed={
    userid: String,
    name: String,
    postimage: Buffer,
    url: String,
    date: String,
    desc: String
}

module.exports = mongoose.model('PhotoFeeds', photoFeed)