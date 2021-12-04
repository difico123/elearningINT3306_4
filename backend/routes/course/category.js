const express = require('express');
const router = express.Router();
const ApiCategory = require('../../controllers/ApiCategory');

// @route   GET api/category/get
// @desc    get category
// @access  Public
router.get('/get', ApiCategory.getCategory);
router.get('/getName', ApiCategory.getName);

module.exports = router;
