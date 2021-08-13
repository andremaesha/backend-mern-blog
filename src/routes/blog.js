const express = require("express");
const { body } = require("express-validator");

const {
    createBlogPost,
    getAllBlogPost,
    getBlogPostById,
    updateBlogPost,
    deleteBlogPost,
} = require("../controllers/blog");

const router = express.Router();

// [POST] => /v1/blog/post
router.post(
    "/post",
    [
        body("title")
            .isLength({ min: 5 })
            .withMessage("input title tidak sesuai"),
        body("body")
            .isLength({ min: 5 })
            .withMessage("input body tidak sesuai"),
    ],
    createBlogPost
);

// [GET] => /v1/blog/posts
router.get("/posts", getAllBlogPost);

// [GET] => /v1/blog/post/:postId
router.get("/post/:postId", getBlogPostById);

// [PUT] => /v1/blog/post/:postId
router.put(
    "/post/:postId",
    [
        body("title")
            .isLength({ min: 5 })
            .withMessage("input title tidak sesuai"),
        body("body")
            .isLength({ min: 5 })
            .withMessage("input body tidak sesuai"),
    ],
    updateBlogPost
);

// [DELETE] => /v1/blog/post/:postId
router.delete("/post/:postId", deleteBlogPost);

module.exports = router;
