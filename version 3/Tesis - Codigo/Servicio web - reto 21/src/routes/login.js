const express = require('express');
const router = express.Router();

//Draclaración de variables-------------------------------------------------------->
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');



//Conexión con la base de datos----------------------------------------------------->

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'gimnasio',
    port: 5432
});


//Importar variables con las funciones---------------------------------------------->
const { testLogin,comparePassword } = require('../controller/login.controller');


//Asignaciónd las funciones a las rutas
router.get('/testLogin', testLogin);


router.post('/login', async(req, res) => {

    try {
        
        const { correo, password } = req.body;
        const response = await pool.query('select documento, nombres, primer_apellido, segundo_apellido, nombre_rol from usuarios, rol where rol = id_rol and correo = $1 and password = $2',[correo, password]);
        
        if(!response.error){

            if(response.rowCount > 0){
                let data = JSON.stringify(response.rows[0]);
                const token = jwt.sign(data,process.env.secretK);
                res.json({token});
            }else{
                res.json('usuario o contraseña incorrectos');
            }

        }else{
            res.json(response.error);
        }

    } catch (error) {
        

        res.status(401).json('Usuario o contraseña incorrectos, intente nuevamente');

    }

});

router.post('/test', verifyToken,(req, res) => {
    
    res.json('información secreta');
});

function verifyToken(req, res, next){

    if(!req.headers.authorization){
        
        return res.status(401).JSON('No autorizado');
    }

    const token = req.headers.authorization.substr(7);
    
    if(token!==''){
        const content =  jwt.verify(token,process.env.secretK);
        req.data = content;
        next();
    }else{
        res.status(401).json('Token Vacio');
    }



}




router.post('/comparePassword', comparePassword);


//Exportar las rutas
module.exports = router;