const Photo = require('../models/Photo');

exports.about = (req, res) => {
  res.render('about');
};

exports.add = (req, res) => {
  res.render('add_photo');
};

exports.edit = async (req, res) => {
  //console.log(req.params.id);
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', {
    photo,
  });
};
