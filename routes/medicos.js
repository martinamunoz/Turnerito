// Importamos el submódulo Router
const { Router } = require('express')

// Importamos modulo para validacion de IDs
const validator = require('validator')

// Importamos la base de datos y los modelos
const db = require('../database')
const Medico = require('../database/models/medico.model')


// Instanciamos un router
const router = Router()

// Ruta para obtener todas los medicos
router.get('/', function (req, res, next) {
    let query = {}
    if(req.query.hasOwnProperty('especialidad'))
        query.especialidad= req.query.especialidad
    // if(req.query.hasOwnProperty('hora_atencion'))
    //     query.horario_atencion= req.query.horario_atencion
    db.medicos.find(query, function (error, medicos) {
            if (error)
                next(error)
            res.send(medicos)
        })
})

// Ruta para obtener los datos de un medico en particular
router.get('/:idMedico', function (req, res, next) {
    const idMedico = req.params.idMedico;
    // Validamos el ID de la mascota buscada
    if (!validator.isUUID(idMedico)) {
        let error = new Error('El id especificado no tiene un formato correcto')
        next(error)
    }

    db.medicos
        .findOne({ _id: idMedico }, function (error, medico) {
            if (error) {
                next(error)
            }
            res.send(medico)
        })
})


router.post('/', function (req, res, next) {
    const data = req.body;
    if (!validator.isUUID(data._id)) {
        let error = new Error('El id especificado no tiene un formato correcto')
        return next(error)
    }
    const mediconuevo = new Medico(data.nombre, data.apellido, data.dni, data.tel, data.especialidad, data.consultorio)
    
    db.medicos
        .insert(mediconuevo, function (error, medicoInsertado) {
            if (error)
                return next(error)
            res.send(medicoInsertado)
        })
})

// Ruta para eliminar un medico en particular
router.delete('/:idMedico', function (req, res, next) {
    const idMedico = req.params.idMedico;

    // Validamos el ID del medico buscado
    if (!validator.isUUID(idMedico)) {
        let error = new Error('El id especificado no tiene un formato correcto')
        next(error)
    }
    db.medicos
        .findOne({ _id: idMedico }, function (error, medicoExistente) {
            if (error)
                return next(error)
            db.medicos
                .remove({ _id: idMedico }, {}, function (error, numRemoved) {
                    if (error)
                        return next(error)
                    if(numRemoved == 1)
                        res.send(medicoExistente)
                    else
                        return next(error)
                })
    })
})


// Ruta para modificar un medico
router.patch('/:idMedico', function (req, res, next) {
    const data = req.body;
    const idMedico = req.params.idMedico;
    if (!validator.isUUID(idMedico)) {
        let error = new Error('El id especificado no tiene un formato correcto')
        next(error)
    }
    db.medicos
        .findOne({ _id: idMedico }, function (error, medicoExistente) {
            if (error) 
                return next(error)
            for (var prop in data)
            {
                if(prop == '_id' || prop == 'id')
                    continue
                if (data.hasOwnProperty.call(medicoExistente, prop))
                    medicoExistente[prop] = data[prop]
                else
                    return next(error)
            }
            db.medicos
                .update({ _id: idMedico }, medicoExistente, {}, (error, numAffected, medicoActualizado) => {
                    if (error)
                        return next(error)
                    if(numAffected == 1)
                        res.send(medicoExistente)
                    else
                        return next(error)
                })
        })
})



// Exportamos nuestro router
module.exports = router;