var Pub = require('../models/pub')

module.exports = function (app, express) {
  var pubRouter = express.Router()

        // pub routes
  pubRouter.get('/publications', function(req, res) {
    Pub.find(function (err, pubs) {
      pubs.forEach(function (item) {
        console.log('Received a GET request for _id: ' + item._id)
      })
      if (!err) {
      return res.send(pubs)
    } else {
      console.log(err)
    }
    })
  })

  pubRouter.get('/publications/:id', function (req, res) {
    Pub.findById(req.params.id, function (err, pub) {
      if (err) {
        console.log(err)
      } else {
        console.log('pub get')
        return res.send(pub)
      }
    })
  })

  pubRouter.post('/publications', function (req, res) {
    console.log('post pub route triggered')

    var postPub = new Pub({
      contributor: req.body.contributor,
      contributorId: req.body.contributorId,
      title: req.body.title,
      type: req.body.type,
      drafts: req.body.drafts,
      tags: req.body.tags,
      invitedByConrib: req.body.invitedByContrib,
      invitedByPubId: req.body.invitedByPubId,
      directedAt: req.body.directedAt,
      published: req.body.published,
      publishedDate: req.body.publishedDate,
      inRhizome: req.body.inRhizome
    })

    postPub.save(function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('pub created')
        return res.send(postPub)
      }
    })
  })

  pubRouter.put('/publications/:id', function (req, res) {
    console.log('put pub route triggered')
    console.log(req.params)

    Pub.findById(req.params.id, function (err, pub) {
      pub.contributor = req.body.contributor
      pub.contributorId = req.body.contributorId
      pub.title = req.body.title
      pub.type = req.body.type
      pub.activeContent = req.body.activeContent
      pub.drafts = req.body.drafts
      pub.tags = req.body.tags
      pub.invitedByContrib = req.body.invitedByContrib
      pub.invitedByPubId = req.body.invitedByPubId
      pub.directedAt = req.body.directedAt
      pub.published = req.body.published
      pub.publishedDate = req.body.publishedDate
      pub.inRhizome = req.body.inRhizome
      pub.save(function (err) {
        if (err) {console.log(err)} else {
          console.log('pub updated')
          return res.send(pub)
        }
      })
    })
  })

  pubRouter.delete('/publications/:id', function (req, res) {
    console.log('Deleting pub with id: ' + req.params.id)
    Pub.findById(req.params.id, function (err, pub) {
      pub.remove(function (err) {
        if (!err) {
          console.log('Pub removed')
          res.send('')
        } else {
          console.log(err)
        }
      })
    })
  })
  return pubRouter
}
