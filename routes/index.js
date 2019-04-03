var express = require('express');
var router = express.Router();

const nodemailer = require("nodemailer");
var config = require('../config');

let transporter = nodemailer.createTransport(config.mailer);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Code4Share: A platform for sharing code.' });
});

router.get('/about', function(req, res, next){
  res.render('about', { title: 'Code4Share: A platform for sharing code.'});
});

router.route('/contact')
  .get(function(req, res, next){
    res.render('contact', { title: 'Code4Share: A platform for sharing code.'});
  })
  .post(function(req, res, next){
    req.checkBody('name', 'Empty name').notEmpty();
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('message', 'Empty message').notEmpty();
    var errors = req.validationErrors();
    if(errors){
      res.render("contact", {
        title: 'Code4Share: A platform for sharing code.',
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        errorMessages: errors
      });
    } else {
      let mailOptions = {
        from: '"Code4Share 👻" <no-reply@ndene.com>', // sender address
        to: "ndenenafi10@gmail.com", // list of receivers
        subject: "Vous avez un nouveau message ✔ 💋 😊", // Subject line
        text: req.body.message // plain text body
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error){
          return console.log(error);
        } else {
          res.render('thank', { title: 'Code4Share: A platform for sharing code.'});
        }
      });
    }

  });

module.exports = router;
