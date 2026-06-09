const express = require('express');
const router = express.Router();
const {
  getAllPlans,
  createPlan,
  updatePlan,
  deletePlan
} = require('../controllers/membershipController');
const { protect } = require('../middleware/auth');

router.get('/', getAllPlans);
router.post('/', protect, createPlan);
router.put('/:id', protect, updatePlan);
router.delete('/:id', protect, deletePlan);

module.exports = router;
