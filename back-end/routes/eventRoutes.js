const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authenticate = require('../middleware/authenticate');

router.post('/register/:eventId', authenticate, eventController.registerForEvent);
router.post('/', authenticate, eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.put('/:id', authenticate, eventController.updateEvent);
router.delete('/:id', authenticate, eventController.deleteEvent);

module.exports = router;
