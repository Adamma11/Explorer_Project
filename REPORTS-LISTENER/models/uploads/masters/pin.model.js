const mongoose =require('mongoose');
const PinSchema = mongoose.Schema({
        pinCode : {type:String,required:true,unique:true},
        areasCovered :{type:String,required:true},
        district :{type:String,required:true},
        state:{type:String,required:true},
        country:{type:String,required:true},
        modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
        modifiedOn:{type:Date,required:true,default:Date.now}
    }
    );
PinSchema.index({pinCode:1},{unique:true});
module.exports = mongoose.model("Pin",PinSchema);


