// const { model } = require('mongoose');
const mongodb = require('mongoose');

mongodb.connect("mongodb://127.0.0.1:27017/newdb");


const schema = new mongodb.Schema({
    title: {
        required: true,
        type: String
    },
    detail: {
        required: true,
        type: String
    },
    image: {
        required: true,
        type: String
    },
    time: {
        type: Date,
        default: Date.now
    }
})

const userdata = new mongodb.model("schema", schema)

module.exports = userdata;