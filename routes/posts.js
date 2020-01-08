const express = require("express")
const router = express.Router()
const { Tag, Post, User, Category } = require("../models")

// on routes that end in /posts
router
  .route("/posts/:postid?")
  // find all posts / specific post
  .get((req, res) => {
    let params = req.params
    let query
    if (params.postid) {
      query = Post.findOne({ where: { id: params.postid } })
    } else {
      query = Post.findAll()
    }
    query.then(r => res.json(r))
  })
  // create a new post
  .post((req, res) => {
    let body = req.body
    const tags = body.tags.map(tag => 
      Tag.findOrCreate({
        where: { title: tag },
        defaults: { title: tag }
      }).spread((tag, created) => tag)
    )

    User.findAll({ where: { id: body.userId } })
      .then(() => Post.create(body))
      .then(post => 
        Promise.all(tags)
          .then(storedTags => post.addTags(storedTags))
          .then(() => post)
      )
      .then(post => 
        Post.findOne({ where: { id: post.id }, include: [User, Tag, Category] })
      )
      .then(result => res.json(result))
      .catch(err => 
        res
          .status(400)
          .json({ err: `User with id=[${body.userId}] doesn\'t exist.` })
      )
  })

module.exports = router
