const express = require ("express");
const router = express.Router();
const votesController = require('../controllers/voteController');
const {protect, restrictTo} = require('../middleware/authMiddleware');

router.post('/vote-on-issue', votesController.voteOnIssue);

module.exports  = router;
