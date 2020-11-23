const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const verifyUser = require('./verifyToken.js')





module.exports = router