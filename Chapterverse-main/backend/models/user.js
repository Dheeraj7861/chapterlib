const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    avator: {
        type: String,
        default :"https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
    },
    role:{
        type: String,
        default : "user",
        enum: ["user","admin"],
    },
    favourites:[
        {type: mongoose.Types.ObjectId,
        ref: "Book",
        },
    ],
    cart:[
        {type: mongoose.Types.ObjectId,
        ref: "Book",
        },
    ],
    orders:[
        {type: mongoose.Types.ObjectId,
        ref: "order",
        },
    ],
},
{timestamps : true}
);
const user = mongoose.model('User', userSchema);

module.exports = user;