const express = require('express');
const router = express.Router();
const { getWord, createWord, createMeaning, getMeaningsForWord, editMeaning, deleteMeaning  } = require('../../controllers/wordController');

router.get('/word', getWord);
router.post('/createWord', createWord);
router.post("/meaning", createMeaning);
router.get("/meaning/:wordId", getMeaningsForWord);
router.put("/editMeaning/:meaningId", editMeaning);
router.delete("/deleteMeaning/:meaningId", deleteMeaning);

module.exports = router;
