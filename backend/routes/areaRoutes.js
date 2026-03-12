const express = require ("express");
const router = express.Router();
const AreaController = require('../controllers/areaController');

const {protect, restrictTo} = require('../middleware/authMiddleware')

router.get('/get-all-areas', AreaController.getAllAreas);
router.post('/add-new-area', protect, restrictTo(['admin']), AreaController.addArea);
router.delete('/delete-area', protect, restrictTo(['admin']), AreaController.deleteArea);

module.exports = router;
