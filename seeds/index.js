const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');
const { Logger } = require('mongodb');

//mongoose https://mongoosejs.com/docs/
mongoose.connect( 'mongodb://localhost:27017/yelp-camp', {
  //pass in our options
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, ' connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

//remove everything from db and build up new data
const seedDB = async () => {
  await Campground.deleteMany({});
  //loop thru cities and seedHelpers to build mock db
  for(let i=0; i < 5; i++){
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '6015e5b9f5ef1e0015e6f2a9',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna eget est lorem ipsum dolor sit amet consectetur.',
      price,
      geometry: {
        "type" : "Point",
        "coordinates" : [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
},
      images: [{
          url: 'https://res.cloudinary.com/dbxkphn2f/image/upload/v1610411138/YelpCamp/w62nwzxf4b2hcqvwalf9.jpg',
          filename: 'YelpCamp/w62nwzxf4b2hcqvwalf9'
        }
      ]
    })
    await camp.save();
    console.log('done');
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})