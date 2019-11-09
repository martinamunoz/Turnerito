// Importamos el submódulo Router
const { Router } = require('express')

// Importamos modulo para validacion de IDs
const validator = require('validator')

// Importamos la base de datos y los modelos
const db = require('../database')
const ObraSocial = require('../database/models/obra_social.model')


// Instanciamos un router
const router = Router()

// Ruta para obtener todas las obras sociales
router.get('/', function (req, res, next) {
    let query = {}
    db.obras_sociales.find(query, function (error, oS) {
            if (error)
                next(error)
            res.send(oS)
        })
})

// Ruta para obtener los datos de una obra social en particular
router.get('/:idOS', function (req, res, next) {
    const idOS = req.params.idOS;
    // Validamos el ID de la mascota buscada
    if (!validator.isUUID(idOS)) {
        let error = new Error('El id especificado no tiene un formato correcto')
        next(error)
    }
    db.obras_sociales
        .findOne({ _id: idOS }, function (error, OS) {
            if (error) {
                next(error)
            }
            res.send(OS)
        })
})


router.post('/', function (req, res, next) {
    const data = req.body;
    if (!validator.isUUID(data._id)) {
        let error = new Error('El id especificado no tiene un formato correcto')
        return next(error)
    }
    const obraSocialNueva = new ObraSocial(data.nombre)
    
    db.obras_sociales
        .insert(obraSocialNueva, function (error, OSInsertada) {
            if (error)
                return next(error)
            res.send(OSInsertada)
        })
})

// Ruta para eliminar una Obra Social en particular
router.delete('/:idOS', function (req, res, next) {
    const idOS = req.params.idOS;

    // Validamos el ID del medico buscado
    if (!validator.isUUID(idOS)) {
        let error = new Error('El id especificado no tiene un formato correcto')
        next(error)
    }
    db.obras_sociales
        .findOne({ _id: idOS }, function (error, OSExistente) {
            if (error)
                return next(error)
            db.obras_sociales
                .remove({ _id: idOS }, {}, function (error, numRemoved) {
                    if (error)
                        return next(error)
                    if(numRemoved == 1)
                        res.send(OSExistente)
                    else
                        return next(error)
                })
    })
})

// Ruta para modificar una obra Social
router.patch('/:idOS', function (req, res, next) {
    const data = req.body;
    const idOS = req.params.idOS;
    if (!validator.isUUID(idOS)) {
        let error = new Error('El id especificado no tiene un formato correcto')
        next(error)
    }
    db.obras_sociales
        .findOne({ _id: idOS }, function (error, OSExistente) {
            if (error) 
                return next(error)
            for (var prop in data)
            {
                if(prop == '_id' || prop == 'id')
                    continue
                if (data.hasOwnProperty.call(OSExistente, prop))
                    OSExistente[prop] = data[prop]
                else
                    return next(error)
            }
            db.obras_sociales
                .update({ _id: idOS }, OSExistente, {}, (error, numAffected, medicoActualizado) => {
                    if (error)
                        return next(error)
                    if(numAffected == 1)
                        res.send(OSExistente)
                    else
                        return next(error)
                })
        })
})



// Exportamos nuestro router
module.exports = router;