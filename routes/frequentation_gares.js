const express = require('express');

const garesCtrl = require('../controllers/frequentation_gares');

const router = express.Router();

router.post('/', garesCtrl.createStation);
router.get('/:id', garesCtrl.getOneStation);
router.get('/', garesCtrl.getAllStation);
router.put('/:id', garesCtrl.updateStation);
router.delete('/:id', garesCtrl.deleteStation);


module.exports = router;