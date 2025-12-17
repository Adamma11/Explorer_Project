const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
SALT_WORK_FACTOR = 10;

const CdePasswordSchema = mongoose.Schema({
    caseId:{type:String},
    password:{type:String},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now}
})

CdePasswordSchema.pre('save',function(next){
    var cdePassword = this;
    if(!cdePassword.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
        if(err) return next(err);
        bcrypt.hash(cdePassword.password,salt,function(err,hash){
            if(err) return next(err);
            cdePassword.password = hash;
            next();
        });
    });
});

CdePasswordSchema.methods.comparePassword = function(cdePassword,cb){
    bcrypt.compare(cdePassword,this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    });
};

module.exports = mongoose.model('CdePassword',CdePasswordSchema)

