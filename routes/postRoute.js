const express = require('express');
const { getPost, getMyPosts, createPost, updatePost, deletePost } = require('../controllers/postController');
const { authenticate } = require('../middlewares/authenticate');
const { upload } = require('../middlewares/storage');

const router = express.Router();

router.get("/", getPost);

router.use(authenticate);
router.get("/my-posts", getMyPosts);
router.post("/", upload.single('image'), createPost);
router.put("/:id", upload.single('image'), updatePost);
router.delete("/:id", deletePost);

module.exports = router;