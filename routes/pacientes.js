// Importamos el submódulo Router
const { Router } = require('express')

// Importamos modulo para validacion de IDs
const validator = require('validator')

// Importamos la base de datos y los modelos
const db = require('../database')
const Paciente = require('../database/models/paciente.model') //Se usan en los new, son las clases.
const HistoriaClinica = require('../database/models/historia_clinica.model')


// Instanciamos un router
const router = Router()

// Ruta para obtener todas las pacientes
router.get('/', function (req, res, next) {
    let query = {}

    db.pacientes.find(query, function (error, pacientes) {
        if (error) {
            next(error)
        }
        res.send(pacientes)
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

    db.pacientes
        .findOne({ _id: idPaciente }, function (error, paciente) {
            if (error) {
                next(error)
            }
            res.send(paciente)
        })
})

router.get('/:idPaciente/historia-clinica', function (req, res, next) {
    const idPaciente = req.params.idPaciente;

    // Validamos el ID del paciente buscado
    if (!validator.isUUID(idPaciente)) {
        let error = new Error('El id especificado no tiene un formato correcto')
        next(error)
    }

    db.historias_clinicas
        .findOne({ _id: idPaciente }, function (error, historiaClinica) {
            if (error) {
                next(error)
            }
            res.send(historiaClinica)
        })
})




// Ruta para eliminar los datos de un paciente en particular
router.delete('/:idPaciente', function (req, res, next) {
    const idPaciente = req.params.idPaciente;

    // Validamos el ID del paciente buscado
    if (!validator.isUUID(idPaciente)) {
        let error = new Error('El id especificado no tiene un formato correcto')
        next(error)
    }
    db.pacientes
        .findOne({ _id: idPaciente }, function (error, pacienteExistente) {
            if (error)
                return next(error)
            db.pacientes
                .remove({ _id: idPaciente }, {}, function (error, numRemoved) {
                    if (error)
                        return next(error)
                    if (numRemoved == 1)
                        res.send(pacienteExistente)
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
    let pacienteNuevo = new Paciente(data.nombre, data.apellido, data.dni, data.tel, data.mail, data.direccion, data.osID, data.f_nacimiento);
    db.pacientes
        .insert(pacienteNuevo, function (error, pacienteInsertado) {
            if (error)
                next(error)

            res.send(pacienteInsertado)
        })
})

router.post('/:idPaciente/historia-clinica', function (req, res, next) {
    const data = req.body;
    const idPaciente = req.params.idPaciente;
    // Opcionalmente, aqui puede validar los datos del body
    // Como por ejemplo, que la fecha de nacimiento tenga el formato correcto
    let historiaClinicaNueva = new HistoriaClinica(idPaciente, data.medicoID, data.fecha_hora, data.descripcion);
    db.historias_clinicas
        .insert(historiaClinicaNueva, function (error, historiaClinicaInsertada) {
            if (error)
                next(error)

            res.send(historiaClinicaInsertada)
        })
})


// Ruta para modificar un paciente
router.patch('/:idPaciente', function (req, res, next) {
    const data = req.body;
    const idPaciente = req.params.idPaciente;
    if (!validator.isUUID(idPaciente)) {
        let error = new Error('El id especificado no tiene un formato correcto')
        next(error)
    }
    db.pacientes
        .findOne({ _id: idPaciente }, function (error, pacienteExistente) {
            if (error)
                return next(error)
            for (var prop in data) {
                if (prop == '_id' || prop == 'id')
                    continue
                if (data.hasOwnProperty.call(pacienteExistente, prop))
                    pacienteExistente[prop] = data[prop]
                else
                    return next(error)
            }
            db.pacientes
                .update({ _id: idPaciente }, pacienteExistente, {}, (error, numAffected, pacienteActualizado) => {
                    if (error)
                        return next(error)
                    if (numAffected == 1)
                        res.send(pacienteActualizado)
                    else
                        return next(error)
                })
        })
})

// Exportamos nuestro router
module.exports = router;