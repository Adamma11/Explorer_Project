const mongoose =require('mongoose');
const CompanySchema = mongoose.Schema({
        name:{type:String,required:true,unique:true},
        address :{type:String,required:true},
        pinCode : {type:String,required:true},        
        district :{type:String,required:true},
        state:{type:String,required:true},
        country:{type:String,required:true},
        concernperson:{type:String,required:true}, 
        designation:{type:String,required:true},
        modeofverification:{type:String,required:true}, 
        daysforverification:{type:String,required:true}, 
        email:{type:String,required:true},
        phone:{type:String,required:true}, 
        status:{type:String,required:true},
        mandatoryDocuments:{type:String,required:false},
        onlineVerificationPossible:{type:Boolean,required:true},
        verificationFee:{type:Number,required:true},
        // modifiedBy:{type:String,required:true},
        modifiedOn:{type:Date,required:true,default:Date.now}
    }
    );
CompanySchema.index({name:1},{unique:true});    
module.exports = mongoose.model("Company",CompanySchema);