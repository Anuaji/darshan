// routes/trainerRoutes.js
const express = require('express');
const router = express.Router();
const trainercoursecontroller = require('../controller/trainercourse.controller');

router.post('/addCourse', trainercoursecontroller.addCourse);
router.get('/getAllCourses', trainercoursecontroller.getAllCourses);
router.get('/getCourse/:id', trainercoursecontroller.getCourseById);
router.put('/updateCourse/:id', trainercoursecontroller.updateCourse);
router.delete('/deleteCourse/:id', trainercoursecontroller.deleteCourse);

module.exports = router;
