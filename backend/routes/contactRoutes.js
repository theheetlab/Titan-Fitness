const express = require('express');
const router = express.Router();
const { submitContact, getAllContacts, deleteContact } = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

router.post('/', submitContact);
router.get('/', protect, getAllContacts);
router.delete('/:id', protect, deleteContact);

module.exports = router;
