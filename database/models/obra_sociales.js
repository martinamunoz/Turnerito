const uuid = require('uuid/v1')

class Obra_social{
    constructor(nombre){
        this._id = uuid()
        this.nombre = nombre
    }
}
module.exports = Obra_social