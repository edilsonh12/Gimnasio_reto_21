const express = require('express');
const router = express.Router();

//Importar métodos------------------------------------------------------>

const { createPoll, selectGenderUserPoll, validateHistory, validateExams, validateExercise, updatePassword } = require('../controller/poll.controller');

//Definición de las rutas----------------------------------------------->

router.post('/createPoll', createPoll);
router.post('/selectGenderUserPoll', selectGenderUserPoll);
router.post('/validateHistory', validateHistory);
router.post('/validateExams', validateExams);
router.post('/validateExercise', validateExercise);
router.post('/updatePassword', updatePassword);

//Exportar rutas-------------------------------------------------------->
module.exports = router;