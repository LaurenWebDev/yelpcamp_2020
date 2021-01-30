const express = require('express');
const router = express.Router({ mergeParams:true });
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');//may not need
const Campground = require('../models/campground');// may not need
const { campgroundSchema } = require('../schemas.js');//may not need 
const { isLoggedIn, validateCampground, isAuthor} = require('../middleware.js');
const campgrounds = require('../controllers/campgrounds')

const multer  = require('multer');
//stores photos to cloudinary
const {storage } = require('../cloudinary');
const upload = multer({ storage });

//Campground Routes
router.route('/')
  .get(catchAsync(campgrounds.index))
  //photos are uploaded in middleware
  .post(
    isLoggedIn, 
    upload.array('images'), 
    validateCampground, 
    catchAsync(campgrounds.createCampground)
  )

//this order is important
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
  .get(catchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn, 
    isAuthor, 
    upload.array('images'), 
    validateCampground, 
    catchAsync(campgrounds.updateCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))
  
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

module.exports = router;