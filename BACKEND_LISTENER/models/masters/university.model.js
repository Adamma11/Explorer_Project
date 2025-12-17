const mongoose =require('mongoose');
const UniversitySchema = mongoose.Schema({
        name:{type:String,required:true,unique:true},
        address :{type:String,required:true},
        pinCode : {type:String,required:true},        
        district :{type:String,required:true},
        state:{type:String,required:true},
        country:{type:String,required:true},
        onlineVerificationPossible:{type:Boolean,required:true},
        digitizedRecordDate:{type:Date},
        fakeUniversity:{type:Boolean,required:true},
        verificationFee:{type:Number,required:true},
        modifiedBy:{type:String,required:true},
        modifiedOn:{type:Date,required:true,default:Date.now},
   	concernperson:{type:String,required:true},
	designation:{type:String,required:true},
	modeofverification:{type:String,required:true},
	institutestatus:{type:String,required:true},
	daysforverification:{type:Number,required:true},
	email:{type:String,required:true},
	phone:{type:String,required:true}
    }
    );
UniversitySchema.index({name:1},{unique:true});    
module.exports = mongoose.model("University",UniversitySchema);
