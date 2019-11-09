// Importamos el submódulo Router
const { Router } = require('express')

// Importamos modulo para validacion de IDs
const validator = require('validator')

// Importamos la base de datos y los modelos
const db = require('../database')
const Clinica = require('../database/models/clinica.model')


// Instanciamos un router
const router = Router()

// Ruta para obtener todas las mascotas
router.get('/', function (req, res, next) {
    let query = {}
    db.clinicas.find(query, function (error, clinicas) {
            if (error) {
                next(error)
            }
            res.send(clinicas)
        })
})


// Ruta para obtener los datos de una mascota en particular
router.get('/:idClinica', function (req, res, next) {
    const idClinica = req.params.idClinica;

    // Validamos el ID de la mascota buscada
    if (!validator.isUUID(idClinica)) {
        let error = new Error('El id especificado no tiene un formato correcto')
        next(error)
    }

    db.clinicas
        .findOne({ _id: idClinica }, function (error, clinicas) {
            if (error) {
                next(error)
            }
            res.send(clinicas)
        })
})


// Ruta para eliminar los datos de una mascota en particular
router.delete('/:idClinica', function (req, res, next) {
    const idClinica = req.params.idClinica;

    // Validamos el ID de la mascota buscada
    if (!validator.isUUID(idClinica)) {
        let error = new Error('El id especificado no tiene un formato correcto')
        next(error)
    }
    db.clinicas
        .findOne({ _id: idClinica }, function (error, clinicaExistente) {
            if (error)
                return next(error)
            db.clinicas
                .remove({ _id: idClinica }, {}, function (error, numRemoved) {
                    if (error)
                        return next(error)
                    if(numRemoved == 1)
                        res.send(clinicaExistente)
                    else
                        return next(error)
                })
    })
})

// Ruta para crear una clinica
router.post('/', function (req, res, next) {
    const data = req.body;
    if (!validator.isUUID(data._id)) {
        let error = new Error('El id especificado no tiene un formato correcto')
        return next(error)
    }
    const clinicaNueva = new Clinica(data.nombre, data.cuit, data.direccion, data.telefono)
    
    db.clinicas
        .insert(clinicaNueva, function (error, clinicaInsertada) {
            if (error)
                return next(error)
            res.send(clinicaInsertada)
        })
})

// Ruta para modificar una mascota
router.patch('/:idClinica', function (req, res, next) {
    const data = req.body;
    const idClinica = req.params.idClinica;
    if (!validator.isUUID(idClinica)) {
        let error = new Error('El id especificado no tiene un formato correcto')
        next(error)
    }
    db.clinicas
        .findOne({ _id: idClinica }, function (error, clinicaExistente) {
            if (error) 
                return next(error)
            for (var prop in data)
            {
                if(prop == '_id' || prop == 'id')
                    continue
                if (data.hasOwnProperty.call(clinicaExistente, prop))
                    clinicaExistente[prop] = data[prop]
                else
                    return next(error)
            }
            db.clinicas
                .update({ _id: idClinica }, clinicaExistente, {}, (error, numAffected, mascotaActualizada) => {
                    if (error)
                        return next(error)
                    if(numAffected == 1)
                        res.send(clinicaExistente)
                    else
                        return next(error)
                })
        })
})

// Exportamos nuestro router
module.exports = router;