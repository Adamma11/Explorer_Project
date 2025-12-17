const mongoose = require('mongoose');
const RefreshTokenSchema = mongoose.Schema({
    userId:{type:String,requied:true,unique:true},
    refreshToken:{type:String},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now}
});
RefreshTokenSchema.index({userId:1},{unique:true});
module.exports = mongoose.model('RefreshToken',RefreshTokenSchema);
