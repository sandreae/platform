var Rhizome = require('../models/rhizome')
var _ = require('underscore')

module.exports = function (app, express) {
  var rhizomeRouter = express.Router()

  rhizomeRouter.route('/rhizomes')
    .post(function (req, res) {
      var rhizome = new Rhizome({
        rhizomeName: req.body.rhizomeName,
        startedBy: req.body.startedBy,
        seedPubId: req.body.seedPubId
      })

      rhizome.save(function (err) {
        if (err) {
          if (err.code === 11000) {
            res.send({success: false, message: 'Duplicate rhizomeName.'})
          } else {
            res.send(err)
          }
        } else {
          return res.send(rhizome)
        }
      })
    })
    .get(function (req, res) {
      Rhizome.find(function (err, rhizomes) {
        if (err) {
          res.send(err)
        }
        return res.send(rhizomes)
      })
    })

  rhizomeRouter.route('/rhizomes/:rhizome_id')
    .get(function (req, res) {
      Rhizome.findById(req.params.rhizome_id, function (err, rhizome) {
        if (err) {
          res.send(err)
        } else {
          return res.send(rhizome)
        }
      })
    })
    .put(function (req, res) {
      Rhizome.findById(req.params.rhizome_id, function (err, rhizome) {
        if (err) res.send(err)
        if (req.body.rhizomeName) rhizome.rhizomeName = req.body.rhizomeName
        if (req.body.startedBy) rhizome.startedBy = req.body.startedBy
        if (req.body.seedPubId) rhizome.seedPubId = req.body.seedPubId

        Rhizome.save(function (err) {
          if (err){res.send(err)} else {
            return res.send(rhizome)
          }
        })
      })
    })
    .delete(function (req, res) {
      if (_.contains(req.decoded.permissions, 'admin')) {
        Rhizome.remove({_id: req.params.rhizome_id}, function (err, rhizome) {
          if (err) res.send(err)
          return res.json({})
        })
      } else {
        res.status(403).send({success: false, message: 'rhizome is not authorized to delete rhizomes'})
      }
    })
  return rhizomeRouter
}
