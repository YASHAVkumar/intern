var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var mongoose=require('mongoose');
const cors=require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//set view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')


/****************************mongodb connection********************/
const {MONGOURL}=require('./config/key')
mongoose.connect(MONGOURL,{useUnifiedTopology: true,useNewUrlParser: true});
mongoose.Promise=global.Promise;
mongoose.connection.on("connected",()=>{console.log("connected on mongodb");})
mongoose.connection.on("error",()=>{console.log("Error"+error);})



app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", '*')
	res.setHeader("Access-Control-Allow-Methods", 'GET, POST, DELETE')
	res.setHeader("Access-Control-Allow-Headers", 'Content-Type', "Authorization")
	next();
});
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Student=require('./models/student');
const Tutor=require('./models/tutor');


app.use(session({
    secret: 'ThisIsNotASecureLoginSystem',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use('student',new LocalStrategy(Student.authenticate()));
passport.serializeUser(Student.serializeUser());
passport.deserializeUser(Student.deserializeUser());

passport.use('tutor',new LocalStrategy(Tutor.authenticate()));
passport.serializeUser(Tutor.serializeUser());
passport.deserializeUser(Tutor.deserializeUser());


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
