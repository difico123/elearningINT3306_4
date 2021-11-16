const { Category } = require('../db/models');
module.exports = class ApiNotification {
    // @route   GET api/category/get
    // @desc    get category
    // @access  Public
    static async getCategory(req, res) {
        try {
            let categories = await Category.findAll();

            res.status(200).json({ error: false, categories });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }
};
