const uuid = require ('uuid/v1')

class Clinicas{
    constructor (cuit, direccion, telefono){
        this._id = uuid()
        this.cuit = cuit
        this.direccion = direccion
        this.telefono = telefono
    }
}
module.exports = Clinicas
