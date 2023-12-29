if(process.env.NODE_ENV !== "production"){
  require('dotenv').config();
}


//!İMPORT SECTİON ****************************
const express = require("express");
const path = require("path");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError");
const errHandles = require("./utils/errHandler");
const connect = require("./seeds/connect");
const methodOverride = require("method-override");
const campRoutes = require("./routes/campgrounds");
const revRoutes = require("./routes/reviews");
const reset = require("./seeds/reset");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user");
const userRoute = require('./routes/user');


const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');

const app = express();

connect(); //TODO : mongo connect function
//! USE MİDDLEWARES **********************************************
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(mongoSanitize({
  replaceWith:'_'
}));//!SECURE

const DB_URL= process.env.MONGO_CONNECT;
const SECRET = process.env.MONGO_STORE_SECRET || "mysecret"





const sessionConfig = {
  name: 'cninnmakes',
  secret: SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session({
  ...sessionConfig,
  store: new MongoStore({ mongoUrl:DB_URL || "mongodb://127.0.0.1:27017/yelp-camp" }),
}));


app.use(flash());
app.use(helmet({ contentSecurityPolicy : false }));

//!PASSPORT AUTH **********************************

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
 
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});


//!ROUTES! *******************************************************



app.get("/campgrounds/secret", async (req, res) => {
  const user = req.user;
  res.render("admin",{user});
});
app.get("/campgrounds/secret/admin?", async (req, res) => {
  const { password } = req.query;
  if (password == "cninnmakes") {
    await reset();
    req.flash("success", "VERİLER RESETLENDİ");
    res.redirect("/campgrounds");
  }
});
app.get("/", (req, res) => {
  res.render("home");
});
app.use('/users',userRoute);
app.use("/campgrounds", campRoutes);
app.use("/campgrounds/:id/review", revRoutes);

app.all("*", (req, res, next) => {
  next(new ExpressError("SAYFA BULUNAMADI", 404));
});

app.use(errHandles);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server ayaklandı : http://localhost:${port}`);
});
