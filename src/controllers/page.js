const crypto = require("crypto");
const fs = require('fs')
const path = require('path')
const helper = require('../util/file')
const Recipe = require("../models/recipe");
const User = require("../models/user");
const pdfkit = require('pdfkit')
const io = require('../soket');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const {
  validationResult
} = require('express-validator')
const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1"
});

///////////getRecipes------------------>
exports.getRecipes = (req, res, next) => {
  console.log("--getRecipes--", req.params._id, req.url, "---");
  if (req.params._id.split('-')[0] === "null") {
    Recipe.find()
      .populate("userId")
      .sort({createdAt:-1})
      .then(recipes => {
        console.log(recipes, "recipesssssss---->")
        res.status(200).send({
          data: recipes,
          pagedata: recipes.slice(req.params._id.split('-')[1] * 9 - 9,
            req.params._id.split('-')[1] * 9)
        });
      })
      .catch(err => {
        const error = new Error(err);
        error.statusCode = 500;
        next(error);
      });
  } else {
    Recipe.find({
        userId: {
          $ne: req.params._id.split('-')[0]
        }
      })
      .populate("userId")
      .sort({createdAt:-1})
      .then(recipes => {
        console.log("recipesssssss")
        res.status(200).send({
          data: recipes,
          pagedata: recipes.slice(req.params._id.split('-')[1] * 9 - 9,
            req.params._id.split('-')[1] * 9)
        });

      })
      .catch(err => {
        const error = new Error(err);
        error.statusCode = 500;
        next(error);
      });
  }

};
///////////-------------------------------------------
///////////get Recipes ------------------>
exports.getOwnerRecipes = (req, res, next) => {
  console.log("--getOwnerRecipes--", req.url, req.params._id, "---");
  console.log("--getOwnerRecipes--", req.params._id !== 'null', "---");
  if (req.params._id !== 'null') {
    Recipe.find({
        userId: req.params._id

      })
      .populate("userId")
      .sort({createdAt:-1})
      .then((recipes) => {
        console.log(recipes, "get owner recipies")
        if(recipes.length>9){

          res.send({
            ownerRecipes: recipes,
            ownerRecipespage: recipes.slice(req.params._id.split('-')[1] * 9 - 9,
            req.params._id.split('-')[1] * 9)
          });
        }else{
          res.send({
            ownerRecipes: recipes,
            ownerRecipespage: recipes
          });
        }

      });
  } else {
    res.send({
      ownerRecipes: [],
      ownerRecipespage: []   
     });
  }


};
exports.getOwnerRecipesLoad = (req, res, next) => {

  console.log("--getOwnerRecipesLoad--", req.url, req.params, "---");
  console.log("--getOwnerRecipesLoads--", req.params._id.split('-')[0] !== '0', "---");
  if (req.params._id.split('-')[0] !== '0') {
    Recipe.find({
        userId: req.params._id.split('-')[0] 
      })
      .populate("userId")
      .sort({createdAt:-1})
      .then((recipes) => {
        console.log(recipes, "get owner recipies")
        if(recipes.length>9){

          res.send({
            ownerRecipes: recipes,
            ownerRecipespage: recipes.slice(req.params._id.split('-')[1] * 9 - 9,
            req.params._id.split('-')[1] * 9)
          });
        }else{
          res.send({
            ownerRecipes: recipes,
            ownerRecipespage: recipes
          });
        }
      });
  } else {
    res.send({
      ownerRecipes: [],
      ownerRecipespage: []
    });
  }



};
///////////-------------------------------------------
///////////getRecipe ------------------>
exports.getRecipe = (req, res, next) => {
  const id = req.params._id;
  console.log("--getRecipe--", req.params, req.session, "---");
  Recipe.findById(id).then((recipe) => {
      console.log(recipe, ">>>,1recipe", !recipe)
      if (!recipe) {
        const error = new Error('recipe was not found');
        error.statusCode = 404;
        throw error
      } else {
        res.status(200).send({
          data: recipe,
        });
      }
    })
    .catch(err => {
      const error = new Error(err);
      error.statusCode = 500;
      next(error);
    });
};
///////////-------------------------------------------
///////////postRecipe ------------------>
exports.postRecipe = (req, res, next) => {
  console.log("--postRecipe--", req.body, "<---->", req.userId, "---");
  const err = validationResult(req)
  // const image=req.body.name
  const image = req.file
  console.log(image, "*********")
  if (!image) {

    res.send({
      msg: 'wrong image format'
    });
  } else if (!err.isEmpty()) {
    res.status(status).json({
      meg: message,
      data: data
    });

    res.send({
      msg: 'wrong text format'
    });
  } else {
    // User.find({_id:req.userId})
    // .then(user=>{
      let recipe = new Recipe({
        name: req.body.name,
        picUrl: image.path,
        description: req.body.description,
        price: req.body.price,
        userId: req.userId,
        // userName:user.name,
        date: new Date()
      });
      recipe.save().then(result => {
        console.log(result, "pagerecipe made")
        io.getIO().emit('recipes',{action:'create',recipe:recipe})
        res.send(result._id)

      })
      .catch(err => {
        const error = new Error(err);
        error.statusCode = 500;
        next(error);
      });

    // });

  }

};
///////////-------------------------------------------
///////////edit Recipes------------------>

exports.postEditRecipe = (req, res, next) => {
  // const id = req.params._id;
  console.log("--postEditRecipe--", req.user, req.body, "---");
  const err = validationResult(req)

  const image = req.file
  console.log(image, "update++")
  if (!err.isEmpty()) {
    res.status(status).json({
      meg: message,
      data: data
    });

    res.send({
      msg: 'wrong text format'
    });
  } else {
    Recipe.findById(req.body._id)
      .then((recipe) => {
        recipe.name = req.body.name;
        recipe.price = req.body.price;
        if (image) {
          helper.deletFile(recipe.picUrl)
          recipe.picUrl = image.path;
        }
        recipe.description = req.body.description;

        recipe.save().then((result) => {
          console.log("UPDATED recipe!");
          io.getIO().emit('recipes',{action:'edit',recipe:recipe})

          res.status(200).send({
            done: true
          })
        })

      })
      .catch(err => {
        const error = new Error(err);
        error.statusCode = 500;
        next(error);
      });
  }

};
exports.postDeleteRecipe = (req, res, next) => {
  const id = req.params._id;
  console.log("--postdeleteRecipe--", req.body, req.userId, "---");
  helper.deletFile(req.body.picUrl)
  return Recipe.findByIdAndRemove(id)
    .then(() => {
      console.log("DESTROYED product");
      // User.find({_id:req.userId})
      // .then(user=>{
      //   console.log(user,"uuuuu");
      //  user.updateCart(req.body);
        io.getIO().emit('recipes',{action:'edit'})
        res.send({
          done: true
        })
      // })
    })
    .catch((err) => console.log(err));
};
///////////-------------------------------------------
///////////cart------------------>

exports.getCart = (req, res, next) => {
  console.log("--getCart--", req.userId, "---");
  User.find({
      _id: req.userId
    })
    .then(
      user => {
        console.log(user, "cart user")
        res.send({
          cart: user[0].cart,
        });
      })
};
exports.ownerCart = (req, res, next) => {
  console.log("--ownerCart--", req.params._id, req.user, "---");
  User.find({
      _id: req.params._id
    })
    .then(user => {
      console.log(user, "ownecart")
      res.send({
        cart: user[0].cart,
      });
    })

};
exports.postCart = (req, res, next) => {
  console.log("--postCart--", req.userId, "---");
  return Recipe.findById(req.body._id)
    .then((result) => {
      return User.find({
          _id: req.userId
        })
        .then(user => {
          console.log(user, "postcart user")
          return user[0].addToCart(result);
        })
    })
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err, "postCart");
      res.status(500).send(err);
    });
};
exports.deleteFromCart = (req, res, next) => {
  console.log("--deleteFromCart--", req.user, "---");
  return req.user
    .deleteFromCart(req.body)
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err, "deleteFromCart");
      res.status(500).send(err);
    });
};

///////////-------------------------------------------
///////////orders------------------>
exports.getSubmitOrder = (req, res, next) => {
  console.log("--getSubmitOrder--", req.params._id, req.user, "---");

  res.send({
    orders: req.user.orders,
  });
};
exports.getOwnerOrder = (req, res, next) => {
  console.log("--getOwnerOrder--", req.params, req.user, "---");
  User.find({
      _id: req.params._id
    })
    .then(user => {
      console.log(user, "user of orders")
      res.send({
        orders: user[0].orders,
      });
    })

};
exports.postSubmitOrder = (req, res, next) => {
  console.log("--postSubmitOrder--", req.params._id, req.user, "---");
  return req.user
    .addToOrder()
    .then((response) => {
      console.log(response, "req.user.orders response");
      res.redirect("/submit-order");
    })
    .catch((err) => console.log(err));
};
exports.getInvoice = (req, res, next) => {
  console.log("--getInvoice--", req.params, req.body, req.user, "---");
  User.find({
      _id: req.user._id
    })
    .then(user => {
      console.log(user[0], "user")
      const order = user[0].orders.find(each =>
        each._id.toString() === req.params.orderId
      )
      console.log(order, "order==", `invoice-${order._id}.pdf`)
      const pdfDOC = new pdfkit()
      // res.setHeader('Content-Length', stat.size);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
      pdfDOC.pipe(fs.createWriteStream(`data/invoices/invoice-${order._id}.pdf`))
      // var file = fs.createReadStream(`data/invoices/invoice-${order._id}.pdf`);
      // var stat = fs.statSync(`data/invoices/invoice-${order._id}.pdf`);
      pdfDOC.pipe(res);
      pdfDOC.fontSize(12).text(`invoice-${order._id}`)
      pdfDOC.text('------------------------------------')
      order.items.map(item => {
        pdfDOC.fontSize(10).text(`${item.name}--------${item.quantity}*${item.unitPrice}`)
      })
      pdfDOC.text('------------------------------------')
      pdfDOC.fontSize(12).text(`total:${order.total}`)
      pdfDOC.end()
    })



};
///////////-------------------------------------------
///////////auth------------------------------------------------------------>
///////////postUser------------------>
exports.postUser = (req, res, next) => {
  console.log("--postUser--", req.body, "---");
  const err = validationResult(req)
  if (!err.isEmpty()) {
    console.log(err.array(), "err.array()")
    res.send({
      msg: err.array()[0].msg,
    });
  } else {
    // User.findOne({
    //   email: req.body.email,
    // })
    //   .then((user) => {
    //     if (user) {
    //       res.send({
    //         newUser: "01",
    //       });
    //     } else {

    return bcrypt.hash(req.body.password, 12).then((hasedPass) => {
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: hasedPass,
          cart: {
            item: [],
            total: 0,
          },
          orders: [],
        });
        user.save().then((result) => {
          res.send({
            newUser: "1",
          });
          console.log(req.body.email, "req.body.email");

          const params = {
            Destination: {
              /* required */

              ToAddresses: [
                "lailysarvarian@gmail.com",
                /* more items */
              ],
            },
            Message: {
              /* required */
              Body: {
                /* required */
                Html: {
                  Charset: "UTF-8",
                  Data: `<p> yeyyy</p>`,
                },
                Text: {
                  Charset: "UTF-8",
                  Data: "TEXT_FORMAT_BODY",
                },
              },
              Subject: {
                Charset: "UTF-8",
                Data: "Test email",
              },
            },
            Source: "laily@lailys.com" /* required */ ,
          };

          // Create the promise and SES service object
          const sendPromise = new AWS.SES({
              apiVersion: "2010-12-01"
            })
            .sendEmail(params)
            .promise();

          // Handle promise's fulfilled/rejected states
          sendPromise
            .then(function (data) {
              console.log(data.MessageId);
            })
            .catch(function (err) {
              console.error(err, err.stack);
            });

          return sendPromise
            .then((res) => {
              console.log("email has been sent");
            })
            .catch(function (err) {
              console.error(err, err.stack);
            });
        });
      })

      //   }
      // })
      .catch((err) => {
        console.log(err, "deleteFromCart");
        res.status(500).send(err);
      });
  }

};
///////////-------------------------------------------
///////////postLogin------------------>
exports.postLogin = (req, res, next) => {
  console.log("--postLogin--", req.body, "---");
  const err = validationResult(req)
  if (!err.isEmpty()) {
    console.log(err.array()[0], "err.array()")
    res.send({
      msg: err.array()[0],
    });
  } else {
    User.findOne({
        email: req.body.email,
      })
      .then((user) => {
        if (!user) {
          res.send({
            msg: 'no user with this information exists',
          });
        } else
        if (user) {
          bcrypt.compare(req.body.password, user.password).then((doMatch) => {
            if (!doMatch) {
              res.send({
                msg: 'no user with this information exists',
              });
            } else
            if (doMatch) {
              const token = jwt.sign({
                  email: user.email,
                  _id: user._id.toString()
                },
                'somesupersecretsecret', {
                  expiresIn: '1h'
                }
              );
              // req.session.isLoggedIn = true;
              // req.session.user = user;
              res.send({
                // auth: req.session.isLoggedIn,
                token: token,
                _id: user._id.toString()
              });
            }
          });
        }
      })
      .catch((err) => {
        console.log(err, "deleteFromCart");
        res.status(500).send(err);
      });
  }

};
///////////-------------------------------------------
///////////postNewPasswordRequest ------------------>
exports.postNewPasswordRequest = (req, res, next) => {
  console.log("--postNewPasswordRequest--", req.body, "---");

  crypto.randomBytes(32, (err, buffer) => {
    console.log("-----");

    if (err) {
      return res.redirect("/");
    }
    const token = buffer.toString("hex");
    User.findOne({
        email: req.body.email
      })
      .then((user) => {
        if (!user) {
          res.send({
            exist: -1,
          });
        } else {
          user.resetToken = token;
          user.resetTokenEXP = Date.now() + 3600000;
          return user.save();
        }
      })
      .then((result) => {
        res.send({
          exist: 1,
        });
        AWS.config.update({
          region: "us-east-1"
        });

        // Create sendEmail params
        const params = {
          Destination: {
            /* required */

            ToAddresses: [
              "lailysarvarian@gmail.com",
              /* more items */
            ],
          },
          Message: {
            /* required */
            Body: {
              /* required */
              Html: {
                Charset: "UTF-8",
                Data: `<p> <a href="http://localhost:3000/reset-password/${token}">link</a> </p>`,
              },
              Text: {
                Charset: "UTF-8",
                Data: "TEXT_FORMAT_BODY",
              },
            },
            Subject: {
              Charset: "UTF-8",
              Data: "Test email",
            },
          },
          Source: "laily@lailys.com" /* required */ ,
        };

        // Create the promise and SES service object
        const sendPromise = new AWS.SES({
            apiVersion: "2010-12-01"
          })
          .sendEmail(params)
          .promise();

        // Handle promise's fulfilled/rejected states
        sendPromise
          .then(function (data) {
            console.log(data.MessageId);
          })
          .catch(function (err) {
            console.error(err, err.stack);
          });

        sendPromise
          .then(function (data) {
            console.log(data.MessageId);
          })
          .catch(function (err) {
            console.error(err, err.stack);
          });
      })
      .catch((err) => console.log(err));
  });
};
///////////-------------------------------------------
///////////postNewPassword------------------>

exports.postNewPassword = (req, res, next) => {
  console.log("--postNewPassword --", req.body, "---");
  User.findOne({
      resetToken: req.body.token,
      resetTokenEXP: {
        $gt: Date.now()
      },
    })
    .then((user) => {
      if (req.body.password !== req.body.passwordConfirmation) {
        res.send({
          passUPdated: "00",
        });
      } else {
        bcrypt.hash(req.body.password, 12).then((hasedPass) => {
          user.password = hasedPass;
          user.save().then((result) => {
            res.send({
              passwordOwner: user._id.toString(),
            });
          });
        })

      }
    })
    .catch((err) => console.log(err));
};
///////////-------------------------------------------
///////////postLogout------------------>

exports.postLogout = (req, res, next) => {
  console.log("--postLogout--", req.body, "---");
  // req.session.destroy();
  res.send({
    auth: false,
  });
};

///////////-------------------------------------------
///////////-------------------------------------------










exports.getLogin = (req, res, next) => {
  //   const isLoggedIn = req
  //     .get('Cookie')
  //     .split(';')[1]
  //     .trim()
  //     .split('=')[1] === 'true';
  console.log(req.session.isLoggedIn, "req.session.isLoggedIn");
  res.send({
    auth: false,
  });
};
exports.getAuth = (req, res, next) => {
  console.log("--getAuth--", req, "---");
  res.send({
    auth: true,
  });
};



