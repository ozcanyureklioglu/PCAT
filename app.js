const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const Photo = require('./models/Photo');
const photoController=require('./controllers/photoController');
const pageController=require('./controllers/pageController');
const { redirect } = require('express/lib/response');

var app = express();

//Mongoose database connection
mongoose.connect('mongodb+srv://ozcan:5Sg1vt5ctuUp5Clu@cluster0.d8yf3.mongodb.net/pcat-db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
}).then(()=>{
  console.log("DB CONNECTİON IS SUCCESFULY");
}).catch(()=>{
  console.log("DB CONNECTİON IS FAİLED");
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

//ROUTES - PHOTO CONTROLLER
app.get('/', photoController.getAllPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);
app.get('/photos/:id', photoController.getPhoto);

//ROUTES - PAGE CONTROLLER
app.get('/about', pageController.about);
app.get('/add', pageController.add);
app.get('/photos/edit/:id', pageController.edit);




const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(port, ' portunda sunucu çalıştı');
});
