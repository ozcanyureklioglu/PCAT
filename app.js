const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const Photo = require('./models/Photo');
const { redirect } = require('express/lib/response');

var app = express();

//Mongoose database connection
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});

//TEMPLATE ENGİNE
app.set('view engine', 'ejs');

//MIDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method',{
  methods:['POST','GET']
}));

//ROUTES
app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index', {
    photos,
  });
});
app.get('/about', (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  res.render('about');
});
app.get('/add', (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  res.render('add_photo');
});

app.post('/photos', async (req, res) => {
  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadImage.name;

  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadImage.name,
    });
    res.redirect('/');
  });
});
app.get('/photos/:id', async (req, res) => {
  //console.log(req.params.id);
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});

app.get('/photos/edit/:id', async (req, res) => {
  //console.log(req.params.id);
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', {
    photo,
  });
});

app.put('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title=req.body.title;
  photo.description=req.body.description;
  photo.save();
  
  res.redirect(`/photos/${req.params.id}`);

});
app.delete('/photos/:id', async (req, res) => {
  const photo=await Photo.findByIdAndRemove(req.params.id);

  let deleteImage=__dirname+'/public'+photo.image;
  fs.unlinkSync(deleteImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
  console.log(port, ' portunda sunucu çalıştı');
});
