var User = require('../models/user')

module.exports = function (app, express) {

  var userRouter = express.Router()

  userRouter.route('/users')
    .post(function (req, res) {
      var user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        permissions: req.body.permissions,
        pendingPub: req.body.pendingPub,
        memberOf: req.body.memberOf,
        contributorNames: req.body.contributorNames
      })

      user.save(function(err) {
        if (err) {
          if (err.code === 11000) {
           res.send({success: false, message: 'Duplicate userName.'})
          } else {
           res.send(err)
          }
        } else {
          return res.send(user)
        }
      })
    })
  return userRouter
}
