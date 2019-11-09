const uuid = require ('uuid/v4')

class Clinica{
    constructor (nombre, cuit, direccion, telefono){
        this._id = uuid()
        this.nombre = nombre
        this.cuit = cuit
        this.direccion = direccion
        this.telefono = telefono
    }
}
module.exports = Clinica
