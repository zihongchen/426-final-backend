const mongoose = require('mongoose')


const alumniPostSchema = mongoose.Schema({ 
    
    fist_name: { 
        type: String,
        
    },
    
    last_name: { 
        type: String,
        
    },
    email: { 
        type: String,
        
    },
    description: {
        type: String, 
    },
    time_slot: {
        type: Date,
        default: Date.now,
    }


})

module.exports = mongoose.model("Post", alumniPostSchema)
