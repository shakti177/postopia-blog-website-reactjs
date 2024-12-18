const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middlewares/isLoggedIn');

const { createPost, updatePost, deletePost } = require('../controllers/postController');


router.post('/create', isLoggedIn, createPost);

router.post("/update/:id", isLoggedIn, updatePost);

router.post("/delete/:id", isLoggedIn, deletePost);


module.exports = router;