const mongoose =require('mongoose');
const CompanySchema = mongoose.Schema({
        name:{type:String,unique:true},
        address :{type:String},
        pin : {type:String},        
        district :{type:String},
        state:{type:String},
        country:{type:String},
        concernperson:{type:String}, 
        designation:{type:String},
        modeofverification:{type:String}, 
        daysforverification:{type:String}, 
        email:{type:String},
        phone:{type:String}, 
        status:{type:String},
        mandatoryDocuments:{type:String,required:false},
        onlineVerificationPossible:{type:Boolean},
        verificationFee:{type:Number},
        // modifiedBy:{type:String},
        modifiedOn:{type:Date,default:Date.now}
    }
    );
CompanySchema.index({name:1},{unique:true});    
module.exports = mongoose.model("Company",CompanySchema);
