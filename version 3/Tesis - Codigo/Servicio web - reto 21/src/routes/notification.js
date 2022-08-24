const express = require('express');
const router = express.Router();

//Importar los métodos----------------------------------------------------------------->

const { selectAllNotification, countRowsNotifications, deleteNotificationUser, createNotification } = require('../controller/notification.controller');

//Definición de rutas------------------------------------------------------------------>

router.post('/selectAllNotification', selectAllNotification);
router.post('/countRowsNotifications', countRowsNotifications);
router.post('/deleteNotificationUser', deleteNotificationUser);
router.post('/createNotification', createNotification);


//Exportar las rutas------------------------------------------------------------------->
module.exports = router;