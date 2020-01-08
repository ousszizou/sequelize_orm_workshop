const express = require('express')
const router = express.Router()
const { User, Post } = require('../models')

// on routes that end in /users
router
  .route('/users')
    // find all users
    .get((req,res) => {
      User.findAll().then(users => {
        res.json(users)
      })
    })
    // create a new user
    .post((req,res) => {
      let body = req.body
      User.create(body).then(user => {
        res.json(user)
      })
      .catch((e) => res.json(e.message))
    })

// find posts belonging to a specific user
router
  .route('/users/:userid/posts')
    .get((req,res) => {
      User.findAll({
        where: {id: req.params},
        include: [Post]
      })
      .then(result => {
        res.json(result)
      })
    })

module.exports = router