const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('../configs');

const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox2b433fdabc1142faa7738d67dba8732c.mailgun.org';
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});

exports.register = (req, res) => {
  console.log(req.body);
  let {firstName, lastName, email, isAdmin, password, phone, address} = req.body;
    User.findOne({email}).exec((err, user) => {
      if (user) {
        return res.status(400).json({
            error: "User with this email already exists.",
        });
      }
    
      const token = jwt.sign({firstName, lastName, email, isAdmin, password, phone, address}, process.env.JWT_ACC_ACTIVATE, {expiresIn: '20m'});
      const data = {
        from: 'no-reply@activate-account.com',
        to: email,
        subject: 'Activate your account',
        html: `
          <h2>Please click on given link to activate your account.</h2>
          <p>http://localhost:3000/email-verification/${token}</p>
        `
      };
      mg.messages().send(data, function (error, body) {
        if(error) {
          return res.json({
            error: err.message
          })
        }
        return res.json({
          message: 'Email has been sent, kindly activate your account'
        })
      });
  });
};

exports.login = (req, res) => {

  const {email, password} = req.body;
  User.findOne({email}).exec((err, user) => {
    if (!user) {
      return res.status(404).send({
        message: `no user found with email ${req.body.email}`,
      });
    }
    if(user.password !== password) {
      return res.status(400).json({
        auth: false,
        token: null,
        error: "Password incorrect.",
      })
    }
    let token = jwt.sign({_id: user._id}, config.jwt.secret, {expiresIn: '20d'});
    const {_id, firstName, lastName, email, isAdmin, phone, address} = user;

    res.json({
      auth: true,
      token: token,
      user: {_id, firstName, lastName, email, isAdmin, phone, address},
    })
  })
};

exports.logout = (req, res) => {
    res.status(200).send({
        auth: false,
        token: null
    });
};

exports.updateUser = (req, res) => {
  User.findById(req.params.id)
  .then(user => {
      if(req.body.password,user.password){
        let body = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email:req.body.email,
          password: req.body.password,
          adress:req.body.adress,
          phone:req.body.phone,
          isAdmin: true
        }
        
        User.findOneAndUpdate({_id : req.params.id}, body)
        .then(user => {
          res.send({
            update: true,
            message: "Profil has been successfully update"
          });
        }).catch(err => {
          res.status(500).send({
            message: err.message || "some error occured when finding users"
          });
        });
      }
      else{
        res.status(401).send({
          message: "Password incorrect"
        })
      }
    }
  )
  .catch(err => {
    res.status(500).send({
      message: err.message || "some error occured when finding users"
    });
  });
};

exports.getUser = (req, res) => {
    User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: `user not found with id ${req.params.id}`,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      return res.status(404).send({
        message: err.message,
      });
    });
};

exports.getUsers = (req, res) => {
  User.find().
 then(data => {
     res.send(data)
 }).catch(err => {
     console.log(err);
     
 });
};

exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id)
      .then(user => {
        res.json({msg: "Deleted User"})
  })
      .catch(err => {
        res.status(500).send({
          message: err.message || "some error occured when finding users"
        });
      });
};

exports.emailVerification = (req, res) => {
  const {token} = req.body;
  if(token) {
     jwt.verify(token, process.env.JWT_ACC_ACTIVATE, function(err, decodedToken) {
       if(err) {
         return res.status(400).json({error: 'Incorrect or Expired link.'})
       }
       const {firstName, lastName, email, isAdmin, password, phone, address} = decodedToken;
        User.findOne({email}).exec((err, user) => {
          if (user) {
            return res.status(400).json({
                error: "User with this email already exists.",
            });
          }
          let newUser = new User({firstName, lastName, email, isAdmin, password, phone, address})
          
        newUser
          .save()
          .then((data) => {
            let userToken = jwt.sign(
              {
                id: data._id,
                admin: data.isAdmin,
              },
              config.jwt.secret,
              {
                expiresIn: 86400,
              }
            );
            res.send({
              auth: true,
              token: userToken,
              message: "Signup success !"
            });
        })
        .catch((err) => {
            res.status(500).send({
              message: err.message || 'Some error occured while ccount activation',
            });
        });
      });
     })
  } else {
    return res.json({error: "Somethinng went wrong !"})
  }
};

exports.forgotPassword = (req, res) => {
  const {email} = req.body;
  User.findOne({email}, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
          error: "User with this email does not exists.",
      });
    }
    const token = jwt.sign({_id: user._id}, process.env.RESET_PASSWORD_KEY, {expiresIn: '20m'});
    const data = {
      from: 'noreply@reset-password.com',
      to: email,
      subject: 'Reset Password',
      html: `
        <h2>Please click on given link to reset your password.</h2>
        <p>http://localhost:3030/api/v1/reset-password/${token}</p>
      `
    };

    return user.updateOne({resetLink: token}, function(err, success) {
      if (err) {
        return res.status(404).json({
            error: "Reset password link error.",
        });
      } else {
        mg.messages().send(data, function (error, body) {
          if (error) {
            return res.json({
                error: err.message
            })
          }
          return res.json({message: 'Email has been sent, kindly follow the instructions.'});
        });
      }
    })
  })
};

exports.resetPassword = (req, res) => {
  const {resetLink, newPassword} = req.body;
  if(resetLink) {
    jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, function(error, decodedData) {
      if(error) {
        return res.status(401).json({
            error: "Incorrect or expired token."
        })
      }
      User.findOne({resetLink}, (err, user) => {
        if(err || !user) {
          return res.status(400).json({
              error: "User with this token doesn't exists.",
          });
        }
        const obj = {
          password: newPassword,
          resetLink: ''
        }
        user = _.extend(user, obj);
        user.save((err, result) => {
          if (err) {
            return res.status(404).json({
                error: "Reset password error.",
            });
          } else {
            return res.status(200).json({message: 'Your password has been successfully changed !'});
          }
        })
      })
    })
  } else {
      return res.status(401).json({
          error: "Authentification error !",
      });
  }
};
    