const express = require('express');
const app = express();
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const AppError = require('./Error/appError.js');
const { errorfunction } = require('./AuthController/errorHandleController.js');

// GLOBAL Middlewares for Express...................

// 1) for HTTP header 
app.use(helmet());


// 2) for Cookie sending
app.use(cookieParser());

// 3) For Parsing data on req.body......................
app.use(express.json());

// Data Santization against NoSQL query injection..........
app.use(mongoSanitize());


// Data Santization for XSS(for html code)..........
app.use(xss());

// Prevent paramete pollution............
app.use(hpp());

const limiter = rateLimit({
      max: 10,
      windowMs: 60 * 60 * 1000,
      message: 'Too many Request from this IP! Please try again in an hour!'
});
// For Rate limiting for APIs.
app.use('/api', limiter);


const Auth = require('./router.js');
// Routes Mounting .................................
app.use('/api/auth', Auth);


// Error for no correct URL...................................
app.all('*', (req, res, next) => {
      next(new AppError(`No such ${req.originalUrl} request to proceed!`, 404));
      // console.log(req);
});

// Global errorhandle middleware........................
app.use(errorfunction);

module.exports = app;
