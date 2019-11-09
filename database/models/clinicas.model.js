const uuid = require ('uuid/v1')

class Clinicas{
    constructor (nombre, cuit, direccion, telefono){
        this._id = uuid()
        this.nombre = nombre
        this.cuit = cuit
        this.direccion = direccion
        this.telefono = telefono
    }
}
module.exports = Clinicas
