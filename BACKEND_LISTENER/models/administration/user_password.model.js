const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
SALT_WORK_FACTOR = 10;

const UserPasswordSchema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,unique:true},
    password:{type:String},
    otp:{type:Number},	
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now}
})

UserPasswordSchema.pre('save',function(next){
    var userPassword = this;
    if(!userPassword.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
        if(err) return next(err);
        bcrypt.hash(userPassword.password,salt,function(err,hash){
            if(err) return next(err);
            userPassword.password = hash;
            next();
        });
    });
});

UserPasswordSchema.methods.comparePassword = function(userPassword,cb){
    bcrypt.compare(userPassword,this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    });
};

module.exports = mongoose.model('UserPassword',UserPasswordSchema)
