// Create web server

// Import modules
const express = require('express');
const router = express.Router();
const db = require('../db');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const auth = require('../middleware/auth');
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const { ObjectID } = require('mongodb');

// Get all comments
router.get('/', (req, res) => {
  Comment.find()
    .then(comments => {
      res.json(comments);
    })
    .catch(err => {
      res.json(err);
    });
});

// Get comments by post
router.get('/post/:id', (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Comment.find({post: id})
    .then(comments => {
      res.json(comments);
    })
    .catch(err => {
      res.json(err);
    });
});

// Create comment
router.post('/', auth, (req, res) => {
  let comment = new Comment({
    post: req.body.post,
    user: req.body.user,
    content: req.body.content
  });
  comment.save()
    .then(comment => {
      res.json(comment);
    })
    .catch(err => {
      res.json(err);
    });
});

// Update comment
router.put('/:id', auth, (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Comment.findByIdAndUpdate(id, {
    $set: {
      content: req.body.content
    }
  }, {new: true})
    .then(comment => {
      if (!comment) {
        return res.status(404).send();
      }
      res.json(comment);
    })
    .catch(err => {
      res.json(err);
    });
});

// Delete comment
router.delete('/:id', auth, (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }