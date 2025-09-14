if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
const express = require("express")
const app = express();
const mongoose = require('mongoose');
const path = require("path")
const session = require("express-session")
const MongoStore = require('connect-mongo');
const engine = require('ejs-mate');
const methodOverride = require('method-override')
const flash = require("connect-flash");
const passport = require("passport")
const LocalStrategy = require("passport-local");

const dburl = process.env.ATLASDB_URL;
const User = require("./models/user.js");
const store = MongoStore.create({
    mongoUrl: dburl,
    crypto: {
      secret: process.env.SECRET
    },
    touchAfter: 24 * 3600,
  });

  store.on("error", (err)=>{
        console.log("error in mongo db session ", err)    
})
const sessionOptions = {
    store,
    secret :process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie:{
        expires: Date.now() + 4 * 24 * 60 * 60 * 1000,
        maxAge: 4 * 24 * 60 * 60 * 1000,
    }
}

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash())

app.use((req, res, next)=>{
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    res.locals.currUser = req.user;
    next();
})

const listingRouter = require("./routes/listings.js")
const reviewRouter = require("./routes/reviews.js")
const userRouter = require("./routes/user.js")

app.set("views", path.join(__dirname, "views"))
app.engine('ejs', engine);
app.set("view engine", "ejs")

app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))


app.get("/", (req, res)=>{
    res.render("listings/welcome.ejs")
})
 
app.use("/listings", listingRouter)
app.use("/listings/:id/review/", reviewRouter)
app.use("/", userRouter);

const port = process.env.PORT || 4000; // 4000 is fallback for local dev
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});

main().then(
    (res)=>{
        console.log("Connectoin Established Sucessfully")
    }
).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.ATLASDB_URL);  
}


// app.get("/demouser", async(req, res, next)=>{
//     let fakeUser = new User({
//         email : "demo@email.com",
//         username: "demo"
//     });
//     let registeredUser =  await User.register(fakeUser, "demo");
//     res.send(registeredUser);
// })


// const asyncWrap = require("../utils/asyncWrap.js")


// app.get("/", (req, res)=>{
//     console.log("working")
// })
// app.get("/getcookies", (req, res)=>{
//     res.cookie("greet", "place")
//     res.send("U got some Cookies");
// })
app.use((err, req, res, next)=>{
    let {status = 500, message = "Some error occured"} = err;
    console.log("error")
    res.render("listings/error.ejs", {err})
})
