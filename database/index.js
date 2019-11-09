var Datastore = require('nedb')

medicos = new Datastore({ filename: './database/datastores/medicos.db', autoload: true })
pacientes = new Datastore({ filename: './database/datastores/pacientes.db', autoload: true })
obras_sociales = new Datastore({filename: './database/datastores/obra_sociales.db', autoload: true})
clinicas = new Datastore ({filename: './database/datastores/clinicas.md', autoload: true})
turnos = new Datastore({ filename: './database/datastores/turno.db', autoload: true })
historias_clinicas = new Datastore({ filename: './database/datastores/historia_clinica.db', autoload: true })

module.exports = {
    medicos,
    pacientes,
    obras_sociales,
    clinicas,
    turnos, 
    historias_clinicas
}