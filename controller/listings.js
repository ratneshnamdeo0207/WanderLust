const Listing = require("../models/listing.js")

module.exports.index = async (req, res)=>{
    let allListing =  await Listing.find()
    console.log(allListing)
    res.render("listings/index.ejs", {data : allListing})
};

module.exports.renderNewForm = (req, res)=>{
    console.log(req.user);
    
    res.render("listings/new.ejs")
};

module.exports.showListing = async (req, res)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({path: "reviews", populate: { path: "author"}}).populate("owner");
    console.log("inside")
    console.log(listing)
    if(!listing  )
    {
        req.flash("error", "Listing does not exist")
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", {listing})
};

module.exports.newListing = async (req, res)=>{
    
    let filename = req.file.filename;
    let url = req.file.path;
    const listing = new Listing(req.body.listing);
    listing.owner = req.user._id;
    listing.image = {filename, url}
    await listing.save()
    console.log("New listing: ", listing)
    req.flash("success", "New Listing Created");
    res.redirect("/listings")
    // res.send("working")
};

module.exports.renderEditform = async (req, res)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing)
        {
            req.flash("error", "Listing does not exist")
            return res.redirect("/listings");
        }
    let originalUrl = listing.image.url;
    originalUrl = originalUrl.replace("/upload", "/upload/w_250")
    res.render("listings/edit.ejs", { listing, originalUrl })

};

module.exports.updateListing = async (req, res)=>{
    console.log("editing")
    
    
    let { id } = req.params;
    // console.log(req.body)
    // console.log(req.body.listing)
   
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing})//... ka mtlb ha jo ha usse vese hi rahne do jo new h usse updaet kr do
    console.log(listing)
    if(typeof req.file !== "undefined")
    {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {filename, url};
        await listing.save();
    }
    
    req.flash("success", "Listing Updated Successfully")
    res.redirect(`/listings/${id}`) 
    
};

module.exports.destroyListing = async (req, res)=>{
    console.log("Delete listing")
    let { id } = req.params;
    console.log(id)
    await Listing.findByIdAndDelete(id)
    console.log("Deletion successfull")
    req.flash("success", "Listing Deleted Successfully")
    res.redirect("/listings")
};

