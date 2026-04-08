import mongoose,{ model, Schema } from "mongoose";
interface ISetting{
    ownerId:string;
    businessName:string;
    supportEmail:string;
    knowledge:string;
    // scaleKitAgentVersionId:string;
}

const settingSchema=new Schema<ISetting>(
    {
        ownerId:{type:String,required:true,unique:true},
        businessName:{type:String,required:true},
        supportEmail:{type:String,required:true},
        knowledge:{type:String,required:true},
        // scaleKitAgentVersionId:{type:String,required:true},
    },
    {timestamps:true});

const Settings=mongoose.models.Settings || model<ISetting>("Settings",settingSchema) ;

export default Settings;
