const uuid = require('uuid/v4')

class Clinica{
    constructor (cuit, direccion, telefono){
        this._id = uuid()
        this.cuit = cuit
        this.direccion = direccion
        this.telefono = telefono
    }
}
module.exports = Clinica
