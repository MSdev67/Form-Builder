const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
const upload = require('../config/multer');

router.post('/', formController.createForm);
router.get('/', formController.getForms);
router.get('/:id', formController.getForm);
router.put('/:id', formController.updateForm);
router.delete('/:id', formController.deleteForm);
router.post('/upload', upload.single('image'), formController.uploadImage);

module.exports = router;