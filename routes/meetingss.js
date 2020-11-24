const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const verifyUser = require('./verifyToken.js')
const mongoose = require('mongoose')

//GET ALL MEETINGS
router.get('/', async (req, res) => {
    try {
        const posts = await Users.find({
            "is_alumni": "true"
        }, {
            "password": 0,
            "email": 0
        })
        // const userInfo = req.user
        // const currentClient = await Users.find({
        //     "_id" : userInfo._id
        // })
        res.json(posts)
    } catch (err) {
        res.json({
            message: err
        })
    }
})



// for alumni to confirm a time slot
router.get('/myMeetings', verifyUser, async (req, res) => {
    const userInfo = req.user
    const currentClient = await Users.findOne({
        "_id": userInfo._id
    })

    try {
        if(currentClient.is_alumni){
            return res.json(currentClient)
        }

   
        
        //     if (currentClient.is_alumni == true) {
        //         let updatedTimeSlot = await Users..aggregate([
        //             {
        //                 "time_slot.StudentToMeet.student_id": userInfo._id
        //             }]
                


        //     } else {
        //         let updatedTimeSlot = await Users
        //             {
        //                 $project: {
        //                     time_slot: {
        //                         $filter: {
        //                             input: "$StudentToMeet",
        //                             as: "student",
        //                             cond: { $eq: ["$$StudentToMeet.student_id", userInfo._id] }
        //                         }
        //                     }
        //                 }
    
        //             }
        //         ])
        //     }

        // let updatedTimeSlot = await Users.find(
        //     {
        //         time_slot: {StudentToMeet: {student_id : userInfo._id}}
        //     }
        // )
        let studentTime = []
        if (currentClient.is_alumni == false && updatedTimeSlot != null) {
            updatedTimeSlot.email= currentClient.email
            updatedTimeSlot.first_name = currentClient.first_name
            updatedTimeSlot.last_name = currentClient.last_name
            updatedTimeSlot. is_alumni =  false 
            
            for(let i = 0; i < updatedTimeSlot.time_slot.length; i ++){
                if(updatedTimeSlot.time_slot[i].StudentToMeet.student_id == userInfo._id){
                    studentTime.push(updatedTimeSlot.time_slot[i])
                }
            }   
            updatedTimeSlot.time_slot = studentTime
        }

           

    if (!updatedTimeSlot) {
        updatedTimeSlot = {
            email: currentClient.email,
            first_name: currentClient.first_name,
            last_name: currentClient.last_name,
            is_alumni: currentClient.is_alumni,
            time_slot: []
        }
        return res.json(updatedTimeSlot)
    }
    return res.json(updatedTimeSlot)
} catch (err) {
    res.json({
        message: err
    })
}

})






//#########ALUMNI SECTION

// for alumni to add a time slot
router.patch('/addTimeSlot', verifyUser, async (req, res) => {
    const userInfo = req.user
    const currentClient = await Users.findOne({
        "_id": userInfo._id
    })
    if (!currentClient.is_alumni) return res.send("Only alumni could add a time slot")

    try {
        if (!req.body.start_time) {
            return res.send("Start time of the meeting must not be empty")
        }
        // CREATE A NEWS TIME SLOT
        const new_time_slot = {}
        new_time_slot.slot_id = mongoose.Types.ObjectId()
        new_time_slot.start_time = req.body.start_time
        new_time_slot.is_booked = false
        new_time_slot.is_confirmed = false
        new_time_slot.AlumniToMeet = {
            alumni_id: currentClient._id,
            first_name: currentClient.first_name,
            last_name: currentClient.last_name,
            email: currentClient.email
        }
        //##########################
        const updatedTimeSlot = await Users.updateOne({
            _id: userInfo._id
        }, {
            $push: {
                time_slot: new_time_slot
            }
        })
        res.json(updatedTimeSlot)
    } catch (err) {
        res.json({
            message: err
        })
    }

})


// for alumni to confirm a time slot
router.patch('/confirmTimeSlot/:slot_id', verifyUser, async (req, res) => {

    const userInfo = req.user
    const currentClient = await Users.findOne({
        "_id": userInfo._id
    })
    if (!currentClient.is_alumni) return res.send("Only alumni could confirm a time slot")

    try {

        // const updatedTimeSlot = await Users.update({
        //     "time_slot.slot_id": req.params.slot_id,
        // }, {
        //     $set: {
        //         "time_slot.$.is_confirmed": true
        //     }

        // })
        // const updatedTimeSlot = await Users.find({
        //     "time_slot.slot_id": req.params.slot_id
        // })

        const updatedTimeSlot = await Users.update({
            "time_slot.slot_id": req.params.slot_id,
        }, {
            $set: {
                "time_slot.$.is_confirmed": true
            }

        })

        res.json(updatedTimeSlot)
    } catch (err) {
        res.json({
            message: err
        })
    }

})



// for alumni to cancel a time slot
router.delete('/cancelTimeSlot/:slot_id', verifyUser, async (req, res) => {

    const userInfo = req.user
    const currentClient = await Users.findOne({
        "_id": userInfo._id
    })
    if (!currentClient.is_alumni) return res.send("Only alumni could delete a time slot")

    try {
        const removedPost = await Users.update({}, {
            $pull: {
                time_slot: {
                    slot_id: req.params.slot_id
                }
            }
        }, {
            multi: true
        })


        // const updatedTimeSlot = await Users.update({
        //     "time_slot.slot_id": req.params.slot_id,
        // }, {
        //     $pull: {
        //         "time_slot.$.slot_id": req.params.slot_id
        //     }

        // })    
        res.json(removedPost)
    } catch (err) {
        res.json({
            message: err
        })
    }

})



// for alumni to confirm a time slot
router.patch('/bookTimeSlot/:slot_id', verifyUser, async (req, res) => {
    const userInfo = req.user
    const currentClient = await Users.findOne({
        "_id": userInfo._id
    })

    try {
        const StudentToMeet = {
            student_id: currentClient._id,
            email: currentClient.email,
            first_name: currentClient.first_name,
            last_name: currentClient.last_name
        }

        const updatedTimeSlot = await Users.update({
            "time_slot.slot_id": req.params.slot_id,
        }, {
            $set: {
                "time_slot.$.is_booked": true,
                "time_slot.$.StudentToMeet": StudentToMeet
            }

        })
        res.json(updatedTimeSlot)
    } catch (err) {
        res.json({
            message: err
        })
    }

})

module.exports = router