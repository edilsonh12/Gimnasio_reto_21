
const { route } = require('express/lib/router');
const { json } = require('express/lib/response');

const { Pool } = require('pg');


//Conexión a la base de datos------------------------------------------------------>

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '16121723e.,',
    database: 'gimnasio',
    port: 5432
});

//Definición de variables que contienen funciones---------------------------------->


const testLogin = (req, res) =>{
    res.json('Login on');
};

const comparePassword = async (req, res) => {

    try {
        const { documento } = req.body;
        const response = await pool.query('select * from usuarios where documento = $1 and password = $2',[documento,documento]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            if(response.rowCount == 0){

                res.status(200).json('No es primera session');

            }else if(response.rowCount >= 1){

                res.status(200).json('Si es la primera session');

            }    


        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}






//Exportar variables--------------------------------------------------------------->
module.exports = {

    testLogin,
    comparePassword

}