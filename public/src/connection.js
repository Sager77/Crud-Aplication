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
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/640px-User_icon_2.svg.png'
    },
    time: {
        type: Date,
        default: Date.now
    }
})
schema.pre('save', function(next) {
    if (this.image === "") {
        this.image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/640px-User_icon_2.svg.png';
    }
    next();
});

const userdata = new mongodb.model("schema", schema)

module.exports = userdata;