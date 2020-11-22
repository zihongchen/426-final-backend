const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },

    description: {
        type: String,
    },
    is_alumni: {
        type: Boolean,
        default: false,
        required: true
    },
    time_slot: [{
        start_time: {
            type: Date
        },
        is_booked: {
            type: Boolean,
            default: false
        },
        studentToMeet: {
            email: {
                type: String
            },
            first_name: {
                type: String
            },
            last_name: {
                type: String
            }
        },
    }]


})

module.exports = mongoose.model("User", UserSchema)