const express = require("express");
const router = express.Router();

//Importing controller
const blogsController = require("../controller/blogs.controller");

//RoutercreateBlog
router.get("/getcount", blogsController.getcountsblog);
router.get("/getAll", blogsController.getAllBlogs);
router.get("/getOne", blogsController.getOneBlog);
router.post("/create", blogsController.createBlog);
router.put("/update/:id", blogsController.updateBlog);
router.delete("/delete/:id", blogsController.deleteBlog);

module.exports = router;
