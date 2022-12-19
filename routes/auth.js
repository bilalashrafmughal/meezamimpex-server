const express = require('express')
const {createAdminValid} = require('../validator')

const {createAdmin, adminLogin, sendQuery} = require('../controllers/auth')

const authRouter = express.Router()

authRouter.post('/createadmin',createAdminValid, createAdmin)
authRouter.post('/adminsignin', adminLogin)
authRouter.post('/sendquery', sendQuery)


module.exports = authRouter