if(process.env.NODE_ENV !=="production"){
  require('dotenv').config()
}
console.log(process.env.CLOUDINARY_SECRET)

const express=require("express");
const app=express();
const path=require("path");
const ejsMate=require('ejs-mate');
const mongoose=require("mongoose");
const joi=require('joi');
const methodOverride=require("method-override");
const campgroundRoutes=require('./routes/campgrounds')
const reviewRoutes=require('./routes/reviews')
const userRoutes=require('./routes/user')
const session =require('express-session')
const flash=require('connect-flash')
const passport=require('passport')
const localStrategy=require('passport-local')
const User=require('./models/user')
const PORT = process.env.PORT || 3000;
//DATA BASE CONNCECTION
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});
//MIDDELWARE
app.engine('ejs',ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,'views'))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,'public')))
//SESSION CONFIG
const sessionConfig={
  secret:"this is my secret",
  resave:false,
  saveUninitialized:true,
  cookie: {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
}
app.use(session(sessionConfig))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
//MODELS
app.use((req,res,next)=>{
  res.locals.currentUser = req.user
  res.locals.success=req.flash('success')
  res.locals.error=req.flash('error')
  next()
})
app.use('/campgrounds',campgroundRoutes)
app.use('/campgrounds',reviewRoutes)
app.use('/',userRoutes)


app.get('/fakeuser',async(req,res)=>{
const user= new User({email:'dakshu@gamil.com',username:'dakshu'})
const newUser=await User.register(user,'dakshu')
res.send(newUser)
})

app.get("/",(req,res)=>{
    res.render("home");
});

//ERROR
app.use((req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if(!err.message)err.message="oh no,something went wrong";
  res.status(statusCode).render('error', { err });
});



app.listen(PORT,()=>{
    console.log("app is listing on port 5000....");;
})
