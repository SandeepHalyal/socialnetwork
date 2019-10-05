const mongoose= require('mongoose')

const testscheme={
    name: String
}

module.exports = mongoose.model("test", testscheme)