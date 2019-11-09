const uuid = require('uuid/v4')

class Turno {
    constructor(fecha_hora, medicoID, estadoID, clinicaID) {
        this._id = uuid()
        this.fecha_hora = fecha_hora
        this.medicoID = medicoID
        this.estadoID = 1
        this.clinicaID = clinicaID
    }
}

module.exports = Turno