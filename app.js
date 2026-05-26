const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js")
const data = require("./init/data.js");
const path = require("path");
const methodOverride = require("method-Override");
const ejsMate = require("ejs-mate");
const Review = require("./models/review.js");



const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate)
app.use(express.static(path.join(__dirname,"/public")))

main().then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/",(req,res)=>{
    res.send("things worning");
});

// app.get("/listing", async(req,res) =>{
// let simplelisting = new listing({
//     title : "my new villa",
//     description : "by the beach",
//     price : 1200,
//     location : "new delhi",
//     country : "india",                                                      
// });

// await simplelisting.save();
// res.send("success")


// });

// app.use("/add/listings", async()=>{
//   let response =  await listing.insertMany(data);
//   console.log(response);
// });

app.get("/listing",async (req,res) =>{
   let listingData = await listing.find({});
   res.render("index.ejs",{listingData});
});

app.post("/listing",async(req,res)=>{
    const newListing = new listing(req.body);
    await newListing.save();
    res.redirect("/listing");
});
app.get("/listing/new",(req,res) =>{
    res.render("new.ejs");
});

// show 
app.get("/listing/:id",async (req,res)=>{
    let {id} = req.params;
   const ourListing = await listing.findById(id);
   res.render("show.ejs", {ourListing});


});

// render form route 

app.get("/listing/:id/edit",async(req,res)=>{
   let {id} = req.params;
  const updateitem = await listing.findById(id);
  res.render("edit.ejs",{updateitem});
});

// update route 

app.put("/listing/:id", async(req,res)=>{
    let {id} = req.params;
    let data = req.body;
    await listing.findByIdAndUpdate(id, data);  //confusion ha
    res.redirect("/listing");
});


// delete route 

app.delete("/listing/:id", async(req,res)=>{
    let {id} = req.params;
   const deletelisting= await listing.findByIdAndDelete(id);
   console.log(deletelisting);
   res.redirect("/listing");
});



// to get the review request 
app.post("/listing/:id/review", async(req,res)=>{
    let Listing = await listing.findById(req.params.id);
    // console.log(Listing);
    let newReview = new Review(req.body.review); 
    // console.log(newReview);
    Listing.reviews.push(newReview);
   await newReview.save();
   await Listing.save();
   console.log("new review saved");
   res.redirect("/listing");


})



app.listen(8080,()=>{
    console.log("app is listening");
});



// <!-- <p><%= listing.image%></p>

//     <%for(listing of listingData){ %>
//   <a href="/listing/<%=listing._id%>"> <%= listing.title%></a> 
//     <br>
// <%}%> --></br>



//   <!-- <ul>
//         <li><%=byid.title%></li>
//         <li><%=byid.description%></li>
//         <li>&#8377;<%=byid.price?.toLocaleString("en-IN")%></li>
//         <li><%=byid.location%></li>
//         <li><%=byid.country%></li>
//     </ul> -->