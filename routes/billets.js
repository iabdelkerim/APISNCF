const express = require('express');
const ticketCtrl = require('../controllers/billets');


const router = express.Router();

router.post('/', ticketCtrl.createTicket);
router.get('/:id', ticketCtrl.getOneTicket);
router.get('/', ticketCtrl.getAllTicket);
router.put('/:id', ticketCtrl.updateTicket);
router.delete('/:id', ticketCtrl.deleteTicket);

module.exports = router;