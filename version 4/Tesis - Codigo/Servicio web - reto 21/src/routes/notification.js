const express = require('express');
const router = express.Router();

//Importar los métodos----------------------------------------------------------------->

const { selectAllNotification, countRowsNotifications, deleteNotificationUser, createNotification, selectAllNotifications, createNotifications, createMultipleNotifications } = require('../controller/notification.controller');

//Definición de rutas------------------------------------------------------------------>

router.post('/selectAllNotification', selectAllNotification);
router.post('/countRowsNotifications', countRowsNotifications);
router.post('/deleteNotificationUser', deleteNotificationUser);
router.post('/createNotification', createNotification);




//Métodos para recepcion---------------------------------------------------------------

router.get('/selectAllNotifications', selectAllNotifications);
router.post('/createNotifications', createNotifications);
router.post('/createMultipleNotifications', createMultipleNotifications);

//-------------------------------------------------------------------------------------


//Exportar las rutas------------------------------------------------------------------->
module.exports = router;