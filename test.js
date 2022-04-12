const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

/*
Photo.create({
  title: 'Photo Title 1',
  description: 'Photo description 1 lorem ipsum',
});
*/


//Read a photo
/*
Photo.find({}, (err, data) => {
  console.log(data);
});
*/


//update photo
/*
const id = '62548e38d2a33ca355e1d757';
Photo.findByIdAndUpdate(
  id,
  {
    title: 'Photo Title 111 updated',
    description: 'Photo description 111 updated',
  },
  {
      new: true
  },
  (err, data) => {
    console.log(data);
  }
);
*/


//delete a photo
const id = '62548e38d2a33ca355e1d757';

Photo.findByIdAndDelete(id, (err, data) => {
  console.log('Photo is removed..');
});

