// Importamos el submódulo Router
const { Router } = require('express')

// Importamos modulo para validacion de IDs
const validator = require('validator')

// Importamos la base de datos y los modelos
const db = require('../database')
const Turno = require('../database/models/turno.model') //Se usan en los new, son las clases.



// Instanciamos un router
const router = Router()

// Ruta para obtener los metodos
router.options('/', function (req,res,next) {
    res.status(200)
    res.header('allow', 'GET, POST, DELETE, PATCH ,OPTIONS')
    res.send()
})
// Ruta para obtener todas las pacientes
router.get('/', function (req, res, next) {
    let query = {}

    db.turnos.find(query, function (error, turnos) {
        if (error) {
            next(error)
        }
        res.send(turnos)
    })
})


// Ruta para obtener los datos de un paciente en particular
router.get('/:idMedico', function (req, res, next) {
    const idMedico = req.params.idMedico;

    // Validamos el ID de la paciente buscada
    if (!validator.isUUID(idMedico)) {
        let error = new Error('El id especificado no tiene un formato correcto')
        next(error)
    }

    let query = {}
    if(req.params.hasOwnProperty('horario_atencion'))
       query.horario_atencion = req.params.horario_atencion
    if(req.params.hasOwnProperty('fecha_atencion'))
       query.fecha_atencion = req.params.fecha_atencion

    db.turnos
        .findOne(query, function (error, turno) {
            if (error)
                next(error)
            res.send(turno)
        })
})

// Ruta para obtener los datos de un paciente en particular
router.get('/:idPaciente', function (req, res, next) {
    const idPaciente = req.params.idPaciente;

    // Validamos el ID de la paciente buscada
    if (!validator.isUUID(idPaciente)) {
        let error = new Error('El id especificado no tiene un formato correcto')
        next(error)
    }

    let query = {}
    if(req.params.hasOwnProperty('horario_atencion'))
       query.horario_atencion = req.params.horario_atencion
    if(req.params.hasOwnProperty('fecha_atencion'))
       query.fecha_atencion = req.params.fecha_atencion

    db.turnos
        .findOne(query, function (error, turno) {
            if (error)
                next(error)
            res.send(turno)
        })
})





// Ruta para eliminar los datos de un paciente en particular
router.delete('/:idTurno', function (req, res, next) {
    const idTurno = req.params.idTurno;

    // Validamos el ID del paciente buscado
    if (!validator.isUUID(idTurno)) {
        let error = new Error('El id especificado no tiene un formato correcto')
        next(error)
    }
    db.turnos
        .findOne({ _id: idTurno }, function (error, turnoExistente) {
            if (error)
                return next(error)
            db.turnos
                .remove({ _id: idTurno }, {}, function (error, numRemoved) {
                    if (error)
                        return next(error)
                    if (numRemoved == 1)
                        res.send(turnoExistente)
                    else
                        return next(error)
                })
        })
})

// Ruta para crear un paciente
router.post('/', function (req, res, next) {
    const data = req.body;

    // Opcionalmente, aqui puede validar los datos del body
    // Como por ejemplo, que la fecha de nacimiento tenga el formato correcto
    let turnoNuevo = new Turno(data.fecha_hora, data.medicoID, data.estadoID, data.clinicaID);
    db.turnos
        .insert(pacienteNuevo, function (error, turnoInsertado) {
            if (error)
                next(error)

            res.send(turnoInsertado)
        })
})



// Ruta para modificar un paciente
router.patch('/:idTurno', function (req, res, next) {
    const data = req.body;
    const idTurno = req.params.idTurno;
    if (!validator.isUUID(idTurno)) {
        let error = new Error('El id especificado no tiene un formato correcto')
        next(error)
    }
    db.turnos
        .findOne({ _id: idTurno }, function (error, turnoExistente) {
            if (error)
                return next(error)
            for (var prop in data) {
                if (prop == '_id' || prop == 'id')
                    continue
                if (data.hasOwnProperty.call(turnoExistente, prop))
                turnoExistente[prop] = data[prop]
                else
                    return next(error)
            }
            db.turnos
                .update({ _id: idPaciente }, turnoExistente, {}, (error, numAffected, turnoActualizado) => {
                    if (error)
                        return next(error)
                    if (numAffected == 1)
                        res.send(turnoActualizado)
                    else
                        return next(error)
                })
        })
})

// Exportamos nuestro router
module.exports = router;