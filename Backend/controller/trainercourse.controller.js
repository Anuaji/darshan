// controllers/trainerController.js
const db = require('../database/config');

// Add a new course
exports.addCourse = (req, res) => {
  const {
    title,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
    language,
    day,
    mode,
    onlineLink,
    insideoutside,
    country,
    state,
    district,
    city,
    area,
    pincode,
    address,
    landmark,
    topics,
  } = req.body;

  const sql = `INSERT INTO courses (title, description, startDate, endDate, startTime, endTime, language, day, mode, onlineLink, insideoutside, country, state, district, city, area, pincode, address, landmark, topics)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [title, description, startDate, endDate, startTime, endTime, language, day, mode, onlineLink, insideoutside, country, state, district, city, area, pincode, address, landmark, JSON.stringify(topics)], (err, result) => {
    if (err) {
      return res.status(500).json({ status: 'Failed', message: 'Database error during insertion', error: err });
    }
    res.status(200).json({ status: 'Success', message: 'Course added successfully', courseId: result.insertId });
  });
};

// Get all courses
exports.getAllCourses = (req, res) => {
  const sql = 'SELECT * FROM courses';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ status: 'Failed', message: 'Database error during retrieval', error: err });
    }
    res.status(200).json({ status: 'Success', data: results });
  });
};

// Get a course by ID
exports.getCourseById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM courses WHERE course_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ status: 'Failed', message: 'Database error during retrieval', error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ status: 'Failed', message: 'Course not found' });
    }
    res.status(200).json({ status: 'Success', data: result[0] });
  });
};

// Update a course by ID
exports.updateCourse = (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
    language,
    day,
    mode,
    onlineLink,
    insideoutside,
    country,
    state,
    district,
    city,
    area,
    pincode,
    address,
    landmark,
    topics,
  } = req.body;

  const sql = `UPDATE courses SET title = ?, description = ?, startDate = ?, endDate = ?, startTime = ?, endTime = ?, language = ?, day = ?, mode = ?, onlineLink = ?, insideoutside = ?, country = ?, state = ?, district = ?, city = ?, area = ?, pincode = ?, address = ?, landmark = ?, topics = ? WHERE course_id = ?`;

  db.query(sql, [title, description, startDate, endDate, startTime, endTime, language, day, mode, onlineLink, insideoutside, country, state, district, city, area, pincode, address, landmark, JSON.stringify(topics), id], (err, result) => {
    if (err) {
      return res.status(500).json({ status: 'Failed', message: 'Database error during update', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ status: 'Failed', message: 'Course not found' });
    }
    res.status(200).json({ status: 'Success', message: 'Course updated successfully' });
  });
};

// Delete a course by ID
exports.deleteCourse = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM courses WHERE course_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ status: 'Failed', message: 'Database error during deletion', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ status: 'Failed', message: 'Course not found' });
    }
    res.status(200).json({ status: 'Success', message: 'Course deleted successfully' });
  });
};
