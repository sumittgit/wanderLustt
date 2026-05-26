const mongoose = require("mongoose");
const schema = mongoose.Schema;

const listingschema = new schema({
    title:{
        type : String,
        // required : true,
    },
    description :{
        type : String,
    },
    image :{
        type: String,
} ,
    price : {
        type : Number,
    },
    location : {
        type : String,
    },
    country :{
        type : String,
    },
    reviews : [
        { type: schema.Types.ObjectId,
            ref :"review",
    }
]
});

const listing = mongoose.model("listing", listingschema);

module.exports = listing;