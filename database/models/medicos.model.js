const uuid = require('uuid/v1')

class Medico {
    constructor(nombre, apellido, dni, tel, especialidad, consultorio) {
        this._id = uuid()
        this.nombre = nombre
        this.apellido = apellido
        this.dni = dni
        this.tel = tel
        this.especialidad = especialidad
        this.consultorio = consultorio
    }
}

module.exports = Medico