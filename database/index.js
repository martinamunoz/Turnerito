var Datastore = require('nedb')

turno = new Datastore({ filename: './database/datastores/turno.db', autoload: true })
historia_clinica = new Datastore({ filename: './database/datastores/historia_clinica.db', autoload: true })

module.exports = {
    turno, historia_clinica
}