const mongoose = require("mongoose");
const schema = mongoose.Schema;
const review = require("./review.js")
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



listingschema.post("findOneAndDelete",async( listing)=>{
    if(listing){
        review.deleteMany({_id :{$in: listing.review}});
    }

});


const listing = mongoose.model("listing", listingschema);

module.exports = listing;