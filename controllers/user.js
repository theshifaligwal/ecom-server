const User = require("../models/user");
const Order = require("../models/order")

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User Not Found!!",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encryptedPassword = undefined;
  // req.profile.createdAt = undefined;
  // req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

// exports.getAllUsers = (req, res) => {
//   User.find().exec((err, users) => {
//     if(err || !users){
//       return res.status(400).json({
//         error: "No users found"
//       })
//     }
//     res.json(users)

//   })
// }

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this user",
        });
      }
      user.salt = undefined;
      user.encryptedPassword = undefined;
      res.json(user);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Order.find({user: req.profile._id})
  .populate("user", "_id name")
  .exec((err, order) => {
    if(err){
      return res.status(400).json({
        error: "No order is this account"
      })
    }
    return res.json(order)
  }) 
}
