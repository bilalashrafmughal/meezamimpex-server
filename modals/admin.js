const mongoose = require('mongoose');
const uuidv4 = require('uuid');
const crypto = require('crypto')
const uniqid = require('uniqid');

const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'true',
        trim: true
    },
    lastName: {
        type: String, 
        required: 'true', 
        trim: true
    },
    email:{
        type: String, 
        required: 'true', 
        trim: true
    },
    hashed_password: {
        type: String, 
        required: 'true', 
        trim: true
    },
    salt: String,
    joiningDate: {
        type: Date,
        default: Date.now
    }
})

adminSchema.virtual("password")
.set(function(password){

    this._password = password

    this.salt = uniqid();

    this.hashed_password = this.encryptPassword(password)

})
.get(function(){
    return this._password
})


adminSchema.methods = {

    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password){
        if (!password) return "";
        try{
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
        }catch (erro){
            return ""
        }
    }

}

module.exports = mongoose.model('Admin', adminSchema)