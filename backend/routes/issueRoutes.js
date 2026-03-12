const express = require ("express");
const router = express.Router();
const IssueController = require('../controllers/issueController');
const {protect, restrictTo} = require('../middleware/authMiddleware')

router.get('/get-issues-area/:areaId', protect, IssueController.getIssuesByAreas);
router.post('/get-issue-id/:issueId', protect, IssueController.getIssueById);
router.post('/create-new-issue', protect, IssueController.createIssue);
router.delete('/delete-issue/:issueId', protect, IssueController.deleteIssueById);
router.patch('/update-issue-status', protect, restrictTo(['admin']),IssueController.updateIssueStatus);
router.get('/get-filtered-issues', protect, IssueController.getFilteredIssues);

module.exports = router;
