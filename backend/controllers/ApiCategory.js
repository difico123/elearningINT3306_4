const { Category } = require('../db/models');
const CategoryService = require('../dbService/categoryService');
module.exports = class ApiNotification {
    // @route   GET api/category/get
    // @desc    get category
    // @access  Public
    static getCategory(req, res) {
        try {
            CategoryService.getCategories().then((categories) => {
                res.status(200).json({ error: false, categories });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }

    static getName(req, res) {
        try {
            CategoryService.getCategoriesName().then((categories) => {
                res.status(200).json({ error: false, categories });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }
};
