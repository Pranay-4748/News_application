const mongoose = require("mongoose");
const NewsSchema = mongoose.Schema(
    {
        headline:{
            type:String,
            required:[true, "enter headline"],
        },
        description: {
            type:String,
            required:[true, "enter description"],
        },
        image:{
            type:String,
            required: false,
            default:0
        },
        link: {
            type:String,
            require:false,
            default:0
        }
            
    },
    {
        timestamps: true
    }
);

const NewsModel = mongoose.model("News", NewsSchema);
module.exports = NewsModel;